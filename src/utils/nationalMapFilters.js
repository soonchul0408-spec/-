import { getNationalRegionId, NATIONAL_ALL } from '@/data/nationalMapData'

export const SCALE_BANDS = {
  UNDER_100B: 'under-100b',
  FROM_100B_TO_1T: '100b-to-1t',
  OVER_1T: 'over-1t',
  UNKNOWN: 'unknown',
}

const LEGISLATION_REVIEW_STAGES = ['입법예고', '상임위 심사', '본회의 심사']

function getScaleText(record) {
  return [record?.scale, record?.amount, record?.budget, record?.projectScale]
    .filter(Boolean)
    .join(' ')
}

function parseAmount(text) {
  const normalized = String(text ?? '').replace(/,/g, '')
  const trillionMatch = normalized.match(/(\d+(?:\.\d+)?)\s*조/)
  const hundredMillionMatch = normalized.match(/(\d+(?:\.\d+)?)\s*억/)

  if (trillionMatch) return Number(trillionMatch[1]) * 1_000_000_000_000
  if (hundredMillionMatch) return Number(hundredMillionMatch[1]) * 100_000_000

  return null
}

export function getScaleBand(record) {
  const amount = parseAmount(getScaleText(record))

  if (amount === null) return SCALE_BANDS.UNKNOWN
  if (amount < 100_000_000_000) return SCALE_BANDS.UNDER_100B
  if (amount < 1_000_000_000_000) return SCALE_BANDS.FROM_100B_TO_1T
  return SCALE_BANDS.OVER_1T
}

export function matchesRegion(record, selectedRegionId) {
  if (selectedRegionId === NATIONAL_ALL) return true

  const recordRegionId = getNationalRegionId(record?.region)
  return recordRegionId === selectedRegionId || recordRegionId === 'nationwide'
}

export function matchesCategory(record, selectedCategory) {
  return selectedCategory === NATIONAL_ALL || record?.category === selectedCategory
}

export function matchesStage(record, selectedStage) {
  if (selectedStage === NATIONAL_ALL) return true
  if (record?.stage === selectedStage) return true

  return selectedStage === '심사 중' && LEGISLATION_REVIEW_STAGES.includes(record?.stage)
}

export function matchesScale(record, selectedScale) {
  return selectedScale === NATIONAL_ALL || getScaleBand(record) === selectedScale
}

export function matchesNationalFilters(record, filters, { includeRegion = true } = {}) {
  return (
    (!includeRegion || matchesRegion(record, filters.regionId)) &&
    matchesCategory(record, filters.category) &&
    matchesStage(record, filters.stage) &&
    matchesScale(record, filters.scale)
  )
}
