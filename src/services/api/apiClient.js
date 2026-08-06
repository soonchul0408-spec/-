import axios from 'axios'

const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '')

// Vercel에서는 별도 공개 플래그가 없어도 서버 함수 호출을 시도합니다.
// 명시적으로 false를 설정한 로컬 환경만 API 호출을 끕니다.
export const isApiEnabled = import.meta.env.VITE_API_ENABLED !== 'false'

const regionalIndustryClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000,
})

export async function fetchRegionalIndustrySnapshot() {
  try {
    const response = await regionalIndustryClient.get('/regional-industry/items')
    return response.data
  } catch (error) {
    const status = error.response?.status
    const message = error.response?.data?.message

    throw new Error(message ?? `API 요청에 실패했습니다.${status ? ` (${status})` : ''}`, {
      cause: error,
    })
  }
}
