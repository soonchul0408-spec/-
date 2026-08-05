<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeMenu = computed(() => {
  if (route.path.startsWith('/national-map')) return '/national-map'
  if (route.path === '/' || route.path.startsWith('/regional-industry')) return '/regional-industry'
  if (route.path.startsWith('/legislation')) return '/legislation'
  if (route.path.startsWith('/my-analysis')) return '/my-analysis'
  if (route.path === '/about') return '/about'
  return '/regional-industry'
})

function handleMenuSelect(path) {
  if (path !== route.path) router.push(path)
}
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="site-header__inner">
        <router-link to="/regional-industry" class="brand">
          <span class="brand-mark">RI</span>
          <span class="brand-copy">
            <strong>지역산업 인사이트</strong>
            <small>공개자료 기반 지역산업 정보</small>
          </span>
        </router-link>

        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          :ellipsis="false"
          class="site-nav"
          @select="handleMenuSelect"
        >
          <el-menu-item index="/regional-industry">지역산업 분석</el-menu-item>
          <el-menu-item index="/national-map">전국 지도</el-menu-item>
          <el-menu-item index="/legislation">법안·입법예고</el-menu-item>
          <el-menu-item index="/my-analysis">내 분석</el-menu-item>
          <el-menu-item index="/about">소개</el-menu-item>
        </el-menu>
      </div>
    </header>

    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f5f7fb;
  color: #172033;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #e5eaf2;
  background: rgb(255 255 255 / 92%);
  backdrop-filter: blur(14px);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1240px;
  min-height: 72px;
  margin: 0 auto;
  padding: 0 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  padding: 0;
  color: #172033;
}

.brand:hover {
  background: transparent;
}

.brand-mark {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 11px;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #0f766e);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.brand-copy {
  display: grid;
  gap: 1px;
}

.brand-copy strong {
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.brand-copy small {
  color: #8490a5;
  font-size: 0.68rem;
  letter-spacing: -0.02em;
}

.site-nav {
  border-bottom: 0;
  background: transparent;
}

:deep(.site-nav .el-menu-item) {
  height: 72px;
  color: #68748a;
  font-weight: 700;
}

:deep(.site-nav .el-menu-item:hover) {
  color: #2563eb;
  background: #f1f5ff;
}

:deep(.site-nav .el-menu-item.is-active) {
  color: #2563eb;
}

.app-content {
  min-height: calc(100vh - 72px);
}

@media (max-width: 680px) {
  .site-header__inner {
    align-items: flex-start;
    display: grid;
    gap: 4px;
    padding: 14px 18px 0;
  }

  .site-nav,
  :deep(.site-nav .el-menu-item) {
    height: 48px;
  }

  :deep(.site-nav .el-menu-item) {
    padding: 0 12px;
  }
}
</style>
