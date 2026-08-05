import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import {
  NATIONAL_ALL,
  NATIONAL_INDUSTRY_OPTIONS,
  NATIONAL_REGION_OPTIONS,
  NATIONAL_REGION_SHAPES,
  NATIONAL_SCALE_OPTIONS,
  NATIONAL_STAGE_OPTIONS,
  getNationalRegionId,
  getNationalRegionLabel,
} from '@/data/nationalMapData'
import { useLegislationStore } from '@/stores/legislation'
import { useRegionalIndustryStore } from '@/stores/regionalIndustry'
import { matchesNationalFilters } from '@/utils/nationalMapFilters'

export const useNationalMapStore = defineStore('nationalMap', () => {
  const regionalStore = useRegionalIndustryStore()
  const legislationStore = useLegislationStore()
  const { items: regionalItems, companies } = storeToRefs(regionalStore)
  const { items: legislationItems } = storeToRefs(legislationStore)

  const selectedRegionId = ref(NATIONAL_ALL)
  const selectedCategory = ref(NATIONAL_ALL)
  const selectedStage = ref(NATIONAL_ALL)
  const selectedScale = ref(NATIONAL_ALL)
  let loadPromise = null

  const filters = computed(() => ({
    regionId: selectedRegionId.value,
    category: selectedCategory.value,
    stage: selectedStage.value,
    scale: selectedScale.value,
  }))

  const filteredProjects = computed(() =>
    regionalItems.value.filter((record) => matchesNationalFilters(record, filters.value)),
  )

  const filteredBills = computed(() =>
    legislationItems.value.filter((record) => matchesNationalFilters(record, filters.value)),
  )

  const mapFilteredProjects = computed(() =>
    regionalItems.value.filter((record) =>
      matchesNationalFilters(record, filters.value, { includeRegion: false }),
    ),
  )

  const relatedCompanies = computed(() => {
    const projectIds = new Set(filteredProjects.value.map((project) => project.id))
    const companyIds = new Set(
      filteredProjects.value.flatMap((project) => project.relatedCompanyIds ?? []),
    )

    return companies.value.filter(
      (company) =>
        companyIds.has(company.id) ||
        (company.projectIds ?? []).some((projectId) => projectIds.has(projectId)),
    )
  })

  const regionOptions = computed(() => NATIONAL_REGION_OPTIONS)
  const selectedRegionLabel = computed(() => getNationalRegionLabel(selectedRegionId.value))
  const isLoading = computed(
    () =>
      regionalStore.status === 'loading' ||
      regionalStore.companyStatus === 'loading' ||
      legislationStore.status === 'loading',
  )

  const apiMessages = computed(() =>
    [
      regionalStore.errorMessage,
      regionalStore.companyErrorMessage,
      legislationStore.errorMessage,
    ].filter(Boolean),
  )
  const noticeStatus = computed(() => (apiMessages.value.length ? 'partial' : 'sample'))
  const noticeMessage = computed(() => apiMessages.value.join(' '))

  const hasSampleRecords = computed(
    () =>
      [...regionalItems.value, ...companies.value, ...legislationItems.value].some((record) =>
        ['sample', 'mixed'].includes(record.dataOrigin),
      ),
  )
  const hasLiveRecords = computed(
    () =>
      [...regionalItems.value, ...companies.value, ...legislationItems.value].some((record) =>
        ['live', 'mixed'].includes(record.dataOrigin),
      ),
  )
  const dataOrigin = computed(() => {
    if (hasLiveRecords.value && hasSampleRecords.value) return 'mixed'
    return hasLiveRecords.value ? 'live' : 'sample'
  })

  const mapRegions = computed(() => {
    const projectCounts = new Map()
    const billCounts = new Map()

    mapFilteredProjects.value.forEach((project) => {
      const regionId = getNationalRegionId(project.region)
      if (regionId && regionId !== 'nationwide') {
        projectCounts.set(regionId, (projectCounts.get(regionId) ?? 0) + 1)
      }
    })

    filteredBills.value.forEach((bill) => {
      const regionId = getNationalRegionId(bill.region)
      if (regionId && regionId !== 'nationwide') {
        billCounts.set(regionId, (billCounts.get(regionId) ?? 0) + 1)
      }
    })

    const maxProjectCount = Math.max(...projectCounts.values(), 1)

    return NATIONAL_REGION_SHAPES.map((shape) => {
      const projectCount = projectCounts.get(shape.id) ?? 0
      const billCount = billCounts.get(shape.id) ?? 0
      const intensity = projectCount
        ? Math.max(1, Math.ceil((projectCount / maxProjectCount) * 4))
        : 0

      return {
        ...shape,
        projectCount,
        billCount,
        totalCount: projectCount + billCount,
        intensity,
      }
    })
  })

  const summary = computed(() => ({
    projectCount: filteredProjects.value.length,
    billCount: filteredBills.value.length,
    companyCount: relatedCompanies.value.length,
    categoryCount: new Set(
      [...filteredProjects.value, ...filteredBills.value]
        .map((record) => record.category)
        .filter(Boolean),
    ).size,
  }))

  function selectRegion(regionId) {
    const isKnownRegion =
      regionId === NATIONAL_ALL || NATIONAL_REGION_OPTIONS.some((option) => option.value === regionId)
    selectedRegionId.value = isKnownRegion ? regionId : NATIONAL_ALL
  }

  function resetFilters() {
    selectedRegionId.value = NATIONAL_ALL
    selectedCategory.value = NATIONAL_ALL
    selectedStage.value = NATIONAL_ALL
    selectedScale.value = NATIONAL_ALL
  }

  async function load({ force = false } = {}) {
    if (loadPromise) return loadPromise

    loadPromise = Promise.all([
      regionalStore.load({ force }),
      legislationStore.load({ force }),
    ]).finally(() => {
      loadPromise = null
    })

    return loadPromise
  }

  function retry() {
    return load({ force: true })
  }

  return {
    selectedRegionId,
    selectedCategory,
    selectedStage,
    selectedScale,
    filters,
    regionOptions,
    industryOptions: NATIONAL_INDUSTRY_OPTIONS,
    stageOptions: NATIONAL_STAGE_OPTIONS,
    scaleOptions: NATIONAL_SCALE_OPTIONS,
    selectedRegionLabel,
    filteredProjects,
    filteredBills,
    relatedCompanies,
    mapRegions,
    summary,
    dataOrigin,
    isLoading,
    noticeStatus,
    noticeMessage,
    load,
    retry,
    selectRegion,
    resetFilters,
  }
})
