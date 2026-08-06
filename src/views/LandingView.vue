<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(path) {
  router.push(path)
}
</script>

<template>
  <div class="landing-page">
    <section class="landing-intro" aria-labelledby="landing-title">
      <div class="landing-intro__eyebrow">
        <span class="landing-intro__dot" aria-hidden="true"></span>
        지역산업 정보 분석 플랫폼
      </div>
      <h1 id="landing-title">어디에서 시작할까요?</h1>
      <p>지역별 정보 또는 최신 법안 정보를 선택해 바로 확인하세요.</p>
    </section>

    <section class="entry-options" aria-label="정보 시작점 선택">
      <div class="entry-options__grid">
        <el-card class="entry-card entry-card--region" shadow="hover" @click="goTo('/national-map')">
          <div class="entry-card__topline">
            <el-tag type="primary" effect="light">지역별 정보</el-tag>
            <span class="entry-card__number">01</span>
          </div>
          <div class="entry-card__visual entry-card__visual--map" aria-hidden="true">
            <span class="map-shape map-shape--one"></span>
            <span class="map-shape map-shape--two"></span>
            <span class="map-shape map-shape--three"></span>
            <span class="map-pin">⌖</span>
          </div>
          <h3>전국 지도에서 지역 선택</h3>
          <p>
            대한민국 시·도를 선택해 해당 지역의 정책·예산·사업, 관련 산업과 공개자료 기반
            관련 기업 정보를 확인합니다.
          </p>
          <div class="entry-card__audience">
            <strong>이런 분께 추천</strong>
            <span>관심 지역의 정책·예산·사업 흐름을 한곳에서 비교하고 싶은 분</span>
          </div>
          <ul class="entry-card__features">
            <li>지역별 사업 규모와 진행 단계</li>
            <li>산업 카테고리별 관련 정보</li>
            <li>선택 지역 상세 화면으로 이동</li>
          </ul>
          <el-button type="primary" class="entry-card__button" @click.stop="goTo('/national-map')">
            지역별 정보 보기
            <span aria-hidden="true">→</span>
          </el-button>
        </el-card>

        <el-card class="entry-card entry-card--latest" shadow="hover" @click="goTo('/legislation')">
          <div class="entry-card__topline">
            <el-tag type="success" effect="light">최신 정보</el-tag>
            <span class="entry-card__number">02</span>
          </div>
          <div class="entry-card__visual entry-card__visual--timeline" aria-hidden="true">
            <span class="timeline-line"></span>
            <span class="timeline-node timeline-node--one"></span>
            <span class="timeline-node timeline-node--two"></span>
            <span class="timeline-node timeline-node--three"></span>
            <span class="timeline-label timeline-label--one">발의</span>
            <span class="timeline-label timeline-label--two">심사</span>
            <span class="timeline-label timeline-label--three">진행</span>
          </div>
          <h3>최근 발의·진행 중인 법안 확인</h3>
          <p>
            최근 제안된 법안과 심사 진행 정보를 중심으로 확인하고, 관심 지역과 산업을 기준으로
            필요한 내용을 골라봅니다.
          </p>
          <div class="entry-card__audience entry-card__audience--latest">
            <strong>이런 분께 추천</strong>
            <span>최근 발의·심사 중인 법안의 변화와 산업 연관성을 빠르게 확인하고 싶은 분</span>
          </div>
          <ul class="entry-card__features">
            <li>제안일과 현재 진행 단계</li>
            <li>관심 지역·산업 카테고리 필터</li>
            <li>공식 출처와 확인 날짜</li>
          </ul>
          <el-button type="success" plain class="entry-card__button" @click.stop="goTo('/legislation')">
            최신 법안 보기
            <span aria-hidden="true">→</span>
          </el-button>
        </el-card>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing-page {
  width: min(1120px, calc(100% - 48px));
  min-height: 100vh;
  margin: 0 auto;
  padding: 48px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.landing-intro {
  margin: 0 auto 34px;
  text-align: center;
}

.landing-intro__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #2563eb;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.landing-intro__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 5px #d1fae5;
}

.landing-intro h1 {
  margin: 14px 0 8px;
  color: #172033;
  font-size: clamp(2.1rem, 4vw, 3.25rem);
  font-weight: 850;
  letter-spacing: -0.08em;
  line-height: 1.12;
}

.landing-intro p {
  color: #69758b;
  font-size: 0.95rem;
  letter-spacing: -0.03em;
  line-height: 1.8;
}

.entry-options {
  width: 100%;
}

.entry-options__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 20px;
  max-width: 1040px;
  margin: 0 auto;
}

.entry-card {
  position: relative;
  overflow: hidden;
  min-height: 500px;
  border: 1px solid #e7ebf2;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.22s ease, border-color 0.22s ease;
}

.entry-card:hover {
  transform: translateY(-5px);
}

.entry-card--region:hover {
  border-color: #b8ccff;
}

.entry-card--latest:hover {
  border-color: #a7e8d0;
}

:deep(.entry-card .el-card__body) {
  padding: 28px;
}

.entry-card__topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.entry-card__number {
  color: #c6cedc;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.entry-card__visual {
  position: relative;
  height: 112px;
  margin: 26px 0 22px;
  overflow: hidden;
  border-radius: 14px;
}

.entry-card__visual--map {
  background: linear-gradient(135deg, #eff4ff, #f5fbff);
}

.map-shape {
  position: absolute;
  display: block;
  border: 2px solid #93b4ff;
  background: rgb(255 255 255 / 58%);
}

.map-shape--one {
  width: 92px;
  height: 54px;
  top: 28px;
  left: 20%;
  border-radius: 46% 54% 42% 58%;
  transform: rotate(-22deg);
}

.map-shape--two {
  width: 84px;
  height: 68px;
  top: 10px;
  left: 42%;
  border-radius: 52% 48% 56% 44%;
  transform: rotate(18deg);
}

.map-shape--three {
  width: 78px;
  height: 46px;
  top: 48px;
  left: 58%;
  border-radius: 48% 52% 50% 50%;
  transform: rotate(-18deg);
}

.map-pin {
  position: absolute;
  top: 31px;
  left: 52%;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: #2563eb;
  box-shadow: 0 7px 16px rgb(37 99 235 / 28%);
  font-size: 1.25rem;
  transform: translateX(-50%);
}

.entry-card__visual--timeline {
  background: linear-gradient(135deg, #effcf7, #f4fbff);
}

.timeline-line {
  position: absolute;
  top: 54px;
  right: 17%;
  left: 17%;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #6ee7b7, #34d399, #2563eb);
}

.timeline-node {
  position: absolute;
  top: 45px;
  width: 21px;
  height: 21px;
  border: 5px solid #fff;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 2px #6ee7b7;
}

.timeline-node--one {
  left: 16%;
}

.timeline-node--two {
  left: calc(50% - 10px);
  background: #2563eb;
  box-shadow: 0 0 0 2px #93b4ff;
}

.timeline-node--three {
  right: 16%;
  background: #dbeafe;
  box-shadow: 0 0 0 2px #93b4ff;
}

.timeline-label {
  position: absolute;
  top: 73px;
  color: #738096;
  font-size: 0.7rem;
  font-weight: 700;
}

.timeline-label--one {
  left: 14%;
}

.timeline-label--two {
  left: calc(50% - 13px);
}

.timeline-label--three {
  right: 14%;
}

.entry-card h3 {
  margin-bottom: 10px;
  color: #172033;
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.05em;
}

.entry-card p {
  min-height: 56px;
  color: #6b778c;
  font-size: 0.92rem;
  letter-spacing: -0.025em;
  line-height: 1.65;
}

.entry-card__audience {
  display: grid;
  gap: 4px;
  min-height: 62px;
  margin-top: 16px;
  padding: 12px 14px;
  border-left: 3px solid #93b4ff;
  border-radius: 0 10px 10px 0;
  background: #f6f8ff;
}

.entry-card__audience--latest {
  border-left-color: #6ee7b7;
  background: #f1fcf7;
}

.entry-card__audience strong {
  color: #334155;
  font-size: 0.76rem;
  font-weight: 800;
}

.entry-card__audience span {
  color: #68758a;
  font-size: 0.78rem;
  letter-spacing: -0.025em;
  line-height: 1.5;
}

.entry-card__features {
  display: grid;
  gap: 7px;
  margin: 20px 0 25px;
  padding: 0;
  color: #4d5c73;
  font-size: 0.83rem;
  list-style: none;
}

.entry-card__features li::before {
  margin-right: 8px;
  color: #2563eb;
  content: '✓';
  font-weight: 800;
}

.entry-card--latest .entry-card__features li::before {
  color: #10b981;
}

.entry-card__button {
  width: 100%;
  height: 44px;
  font-weight: 750;
}

.entry-card__button span {
  margin-left: 8px;
  font-size: 1.1rem;
}

@media (max-width: 760px) {
  .landing-page {
    width: min(100% - 32px, 560px);
    padding: 36px 0;
  }

  .landing-intro {
    margin-bottom: 28px;
  }

  .landing-intro h1 {
    font-size: 2.35rem;
  }

  .entry-options__grid {
    grid-template-columns: 1fr;
  }

  .entry-card {
    min-height: 0;
  }
}
</style>
