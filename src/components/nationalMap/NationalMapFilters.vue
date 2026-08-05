<script setup>
import { useNationalMapStore } from '@/stores/nationalMap'

const emit = defineEmits(['region-change'])
const mapStore = useNationalMapStore()

function handleRegionChange(value) {
  emit('region-change', value)
}
</script>

<template>
  <el-card class="map-filter-card" shadow="never">
    <div class="filter-grid">
      <div class="filter-field filter-field--region">
        <label for="national-region-filter">시·도 선택</label>
        <el-select
          id="national-region-filter"
          v-model="mapStore.selectedRegionId"
          aria-label="대한민국 시·도 선택"
          @change="handleRegionChange"
        >
          <el-option
            v-for="option in mapStore.regionOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>

      <div class="filter-field">
        <label for="national-industry-filter">산업 카테고리</label>
        <el-select
          id="national-industry-filter"
          v-model="mapStore.selectedCategory"
          aria-label="산업 카테고리 선택"
        >
          <el-option
            v-for="option in mapStore.industryOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>

      <div class="filter-field">
        <label for="national-stage-filter">진행 단계</label>
        <el-select
          id="national-stage-filter"
          v-model="mapStore.selectedStage"
          aria-label="정책·사업·법안 진행 단계 선택"
        >
          <el-option
            v-for="option in mapStore.stageOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>

      <div class="filter-field">
        <label for="national-scale-filter">사업 규모</label>
        <el-select
          id="national-scale-filter"
          v-model="mapStore.selectedScale"
          aria-label="사업 규모 선택"
        >
          <el-option
            v-for="option in mapStore.scaleOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>
    </div>

    <div class="active-filter-row">
      <span>현재 조건</span>
      <el-tag type="primary" effect="plain">{{ mapStore.selectedRegionLabel }}</el-tag>
      <el-tag type="success" effect="plain">{{ mapStore.selectedCategory }}</el-tag>
      <el-tag type="warning" effect="plain">{{ mapStore.selectedStage }}</el-tag>
      <el-tag type="info" effect="plain">
        {{ mapStore.scaleOptions.find((option) => option.value === mapStore.selectedScale)?.label }}
      </el-tag>
      <el-button plain @click="mapStore.resetFilters">필터 초기화</el-button>
    </div>

    <p class="scale-help">사업 규모가 공개되지 않은 자료는 전체 규모 선택에서 확인할 수 있습니다.</p>
  </el-card>
</template>

<style scoped>
.map-filter-card {
  border: 1px solid #e5eaf2;
  border-radius: 20px;
  background: #fff;
}

:deep(.map-filter-card .el-card__body) {
  padding: 24px;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.filter-field {
  display: grid;
  gap: 8px;
}

.filter-field label {
  color: #526078;
  font-size: 0.75rem;
  font-weight: 800;
}

.active-filter-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
  color: #8a96aa;
  font-size: 0.78rem;
  font-weight: 700;
}

.active-filter-row :deep(.el-button) {
  margin-left: auto;
}

.scale-help {
  margin: 14px 0 0;
  color: #96a0b1;
  font-size: 0.74rem;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .filter-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 540px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }

  .active-filter-row :deep(.el-button) {
    width: 100%;
    margin-left: 0;
  }
}
</style>
