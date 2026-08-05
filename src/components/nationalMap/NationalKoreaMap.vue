<script setup>
const props = defineProps({
  regions: {
    type: Array,
    default: () => [],
  },
  selectedRegionId: {
    type: String,
    default: '전체',
  },
})

const emit = defineEmits(['select'])

const fillColors = ['#eef4ff', '#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8']

function getFill(region) {
  return fillColors[region.intensity ?? 0]
}

function selectRegion(regionId) {
  emit('select', regionId)
}

function handleKeydown(event, regionId) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectRegion(regionId)
  }
}
</script>

<template>
  <div class="map-shell">
    <div class="map-heading">
      <div>
        <p class="section-eyebrow">NATIONAL VIEW</p>
        <h2>시·도별 공개자료 분포</h2>
      </div>
      <span>사업 수 기준</span>
    </div>

    <div class="map-scroll-area">
      <svg
        class="korea-map"
        viewBox="0 0 640 780"
        role="img"
        aria-labelledby="national-map-title national-map-description"
      >
        <title id="national-map-title">대한민국 시·도별 지역산업 공개자료 지도</title>
        <desc id="national-map-description">
          색이 진할수록 현재 필터 조건에 맞는 정책·사업 정보가 많은 지역입니다.
        </desc>

        <g v-for="region in props.regions" :key="region.id" class="map-region">
          <path
            :d="region.path"
            :fill="getFill(region)"
            :class="{ 'is-selected': props.selectedRegionId === region.id }"
            :aria-label="`${region.label} ${region.projectCount}개 사업, ${region.billCount}개 법안`"
            role="button"
            tabindex="0"
            @click="selectRegion(region.id)"
            @keydown="handleKeydown($event, region.id)"
          >
            <title>
              {{ region.label }} · 사업 {{ region.projectCount }}건 · 법안 {{ region.billCount }}건
            </title>
          </path>
          <text :x="region.labelX" :y="region.labelY" class="map-label" text-anchor="middle">
            {{ region.label }}
          </text>
          <text :x="region.labelX" :y="region.labelY + 19" class="map-count" text-anchor="middle">
            {{ region.projectCount }}건
          </text>
        </g>
      </svg>
    </div>

    <div class="map-legend" aria-label="지도 범례">
      <span>사업 수 적음</span>
      <i v-for="(color, index) in fillColors" :key="color" :style="{ backgroundColor: color }">
        <span class="sr-only">단계 {{ index }}</span>
      </i>
      <span>사업 수 많음</span>
    </div>
    <p class="map-help">지역 도형을 클릭하면 정책·예산·법안·기업 통합 상세 화면으로 이동합니다.</p>
  </div>
</template>

<style scoped>
.map-shell {
  min-width: 0;
}

.map-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.section-eyebrow {
  margin: 0 0 7px;
  color: #2563eb;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.map-heading h2 {
  margin: 0;
  color: #172033;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.05em;
}

.map-heading > span {
  color: #8a96aa;
  font-size: 0.75rem;
  font-weight: 700;
}

.map-scroll-area {
  display: grid;
  place-items: center;
  min-height: 600px;
  overflow: auto;
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgb(239 246 255 / 70%), rgb(248 250 252 / 90%)),
    radial-gradient(circle at 50% 10%, rgb(255 255 255 / 90%), transparent 55%);
}

.korea-map {
  width: min(100%, 620px);
  min-width: 540px;
  height: auto;
  padding: 16px;
}

.map-region path {
  cursor: pointer;
  stroke: #fff;
  stroke-width: 3;
  transition: filter 0.18s ease, stroke 0.18s ease, transform 0.18s ease;
}

.map-region:hover path,
.map-region path:focus-visible,
.map-region path.is-selected {
  filter: brightness(0.92) drop-shadow(0 8px 8px rgb(37 99 235 / 20%));
  stroke: #172554;
  stroke-width: 5;
  outline: none;
}

.map-label,
.map-count {
  pointer-events: none;
  user-select: none;
}

.map-label {
  fill: #26344d;
  font-size: 14px;
  font-weight: 800;
}

.map-count {
  fill: #526078;
  font-size: 11px;
  font-weight: 700;
}

.map-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 14px;
  color: #8a96aa;
  font-size: 0.72rem;
}

.map-legend i {
  display: block;
  width: 22px;
  height: 10px;
  border-radius: 3px;
}

.map-help {
  margin: 10px 0 0;
  color: #96a0b1;
  font-size: 0.75rem;
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .map-scroll-area {
    min-height: 480px;
  }

  .korea-map {
    min-width: 500px;
  }
}
</style>
