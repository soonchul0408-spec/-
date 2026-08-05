<script setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ApiFallbackNotice from '@/components/regional/ApiFallbackNotice.vue'
import NationalMapFilters from '@/components/nationalMap/NationalMapFilters.vue'
import RegionalInsightPanel from '@/components/nationalMap/RegionalInsightPanel.vue'
import { useNationalMapStore } from '@/stores/nationalMap'

const route = useRoute()
const router = useRouter()
const mapStore = useNationalMapStore()

function syncRegion(regionId) {
  mapStore.selectRegion(String(regionId ?? ''))
}

function handleRegionChange(regionId) {
  if (regionId === '전체') {
    router.push({ name: 'national-map' })
    return
  }

  router.replace({ name: 'national-region-detail', params: { regionId } })
}

function goToNationalMap() {
  router.push({ name: 'national-map' })
}

watch(
  () => route.params.regionId,
  (regionId) => syncRegion(regionId),
  { immediate: true },
)

onMounted(() => {
  void mapStore.load()
})
</script>

<template>
  <div class="region-detail-page">
    <div class="detail-toolbar">
      <el-button text @click="goToNationalMap">← 전국 지도로 돌아가기</el-button>
      <span>지역별 공개자료 통합 화면</span>
    </div>

    <section class="detail-hero">
      <p class="eyebrow">REGIONAL DETAIL</p>
      <h1>{{ mapStore.selectedRegionLabel }}</h1>
      <p>
        선택한 시·도의 정책·예산·법안·사업과 공개자료 기반 관련 기업을 현재 필터 조건으로 확인합니다.
      </p>
    </section>

    <NationalMapFilters @region-change="handleRegionChange" />

    <ApiFallbackNotice
      :status="mapStore.noticeStatus"
      :message="mapStore.noticeMessage"
      @retry="mapStore.retry"
    />

    <div v-if="mapStore.isLoading" class="loading-card" aria-busy="true">
      <el-card shadow="never"><el-skeleton animated :rows="16" /></el-card>
    </div>
    <RegionalInsightPanel v-else />
  </div>
</template>

<style scoped>
.region-detail-page {
  max-width: 1240px;
  margin: 0 auto;
  padding: 34px 24px 88px;
}

.detail-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
  color: #8a96aa;
  font-size: 0.78rem;
  font-weight: 700;
}

.detail-hero {
  padding: 38px 42px;
  border-radius: 24px;
  color: #fff;
  background:
    radial-gradient(circle at 90% 0%, rgb(45 212 191 / 25%), transparent 35%),
    linear-gradient(135deg, #172554, #1e3a8a 65%, #0f766e);
}

.eyebrow {
  margin: 0 0 12px;
  color: #93c5fd;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.detail-hero h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.07em;
}

.detail-hero p:last-child {
  max-width: 680px;
  margin: 18px 0 0;
  color: #dbeafe;
  font-size: 0.95rem;
  line-height: 1.7;
}

.region-detail-page > :deep(.map-filter-card) {
  margin-top: 26px;
}

.loading-card {
  margin-top: 28px;
}

.loading-card .el-card {
  border: 1px solid #e5eaf2;
  border-radius: 20px;
}

@media (max-width: 640px) {
  .region-detail-page {
    padding: 24px 18px 64px;
  }

  .detail-toolbar {
    align-items: flex-start;
    display: grid;
  }

  .detail-hero {
    padding: 30px 24px;
  }
}
</style>
