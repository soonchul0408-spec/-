export const NATIONAL_ALL = '전체'

export const NATIONAL_REGION_OPTIONS = [
  { value: NATIONAL_ALL, label: '전국' },
  {
    value: 'seoul',
    label: '서울특별시',
    shortLabel: '서울',
    aliases: ['서울', '서울특별시'],
  },
  {
    value: 'busan',
    label: '부산광역시',
    shortLabel: '부산',
    aliases: ['부산', '부산광역시'],
  },
  {
    value: 'daegu',
    label: '대구광역시',
    shortLabel: '대구',
    aliases: ['대구', '대구광역시'],
  },
  {
    value: 'incheon',
    label: '인천광역시',
    shortLabel: '인천',
    aliases: ['인천', '인천광역시'],
  },
  {
    value: 'gwangju',
    label: '광주광역시',
    shortLabel: '광주',
    aliases: ['광주', '광주광역시'],
  },
  {
    value: 'daejeon',
    label: '대전광역시',
    shortLabel: '대전',
    aliases: ['대전', '대전광역시'],
  },
  {
    value: 'ulsan',
    label: '울산광역시',
    shortLabel: '울산',
    aliases: ['울산', '울산광역시'],
  },
  {
    value: 'sejong',
    label: '세종특별자치시',
    shortLabel: '세종',
    aliases: ['세종', '세종특별자치시'],
  },
  {
    value: 'gyeonggi',
    label: '경기도',
    shortLabel: '경기',
    aliases: ['경기', '경기도'],
  },
  {
    value: 'gangwon',
    label: '강원특별자치도',
    shortLabel: '강원',
    aliases: ['강원', '강원도', '강원특별자치도'],
  },
  {
    value: 'chungbuk',
    label: '충청북도',
    shortLabel: '충북',
    aliases: ['충북', '충청북도'],
  },
  {
    value: 'chungnam',
    label: '충청남도',
    shortLabel: '충남',
    aliases: ['충남', '충청남도'],
  },
  {
    value: 'jeonbuk',
    label: '전북특별자치도',
    shortLabel: '전북',
    aliases: ['전북', '전라북도', '전북특별자치도'],
  },
  {
    value: 'jeonnam',
    label: '전라남도',
    shortLabel: '전남',
    aliases: ['전남', '전라남도'],
  },
  {
    value: 'gyeongbuk',
    label: '경상북도',
    shortLabel: '경북',
    aliases: ['경북', '경상북도'],
  },
  {
    value: 'gyeongnam',
    label: '경상남도',
    shortLabel: '경남',
    aliases: ['경남', '경상남도'],
  },
  {
    value: 'jeju',
    label: '제주특별자치도',
    shortLabel: '제주',
    aliases: ['제주', '제주도', '제주특별자치도'],
  },
]

export const NATIONAL_INDUSTRY_OPTIONS = [
  { value: NATIONAL_ALL, label: '전체 산업' },
  { value: 'AI·데이터센터', label: 'AI·데이터센터' },
  { value: '반도체', label: '반도체' },
  { value: '방산', label: '방산' },
  { value: '이차전지', label: '이차전지' },
  { value: '전력·에너지', label: '전력·에너지' },
]

export const NATIONAL_STAGE_OPTIONS = [
  { value: NATIONAL_ALL, label: '전체 단계' },
  { value: '발의', label: '발의' },
  { value: '심사 중', label: '심사 중' },
  { value: '예산안', label: '예산안' },
  { value: '사업 공고', label: '사업 공고' },
  { value: '사업자 선정', label: '사업자 선정' },
  { value: '착공', label: '착공' },
  { value: '입법예고', label: '입법예고' },
  { value: '상임위 심사', label: '상임위 심사' },
  { value: '본회의 심사', label: '본회의 심사' },
  { value: '통과', label: '통과' },
  { value: '계류·폐기', label: '계류·폐기' },
]

export const NATIONAL_SCALE_OPTIONS = [
  { value: NATIONAL_ALL, label: '전체 규모' },
  { value: 'under-100b', label: '1천억 원 미만' },
  { value: '100b-to-1t', label: '1천억~1조 원' },
  { value: 'over-1t', label: '1조 원 이상' },
]

// 외부 지도 타일 없이 사용하는 간략화된 시·도 SVG 도형입니다.
// 실제 수치가 아닌 지역별 공개자료 건수를 시각화하는 용도로 사용합니다.
export const NATIONAL_REGION_SHAPES = [
  {
    id: 'incheon',
    label: '인천',
    path: 'M42 142 L83 113 L126 124 L133 166 L106 196 L62 186 L38 163 Z',
    labelX: 84,
    labelY: 158,
  },
  {
    id: 'seoul',
    label: '서울',
    path: 'M132 87 L172 77 L198 105 L185 143 L143 147 L119 116 Z',
    labelX: 157,
    labelY: 116,
  },
  {
    id: 'gyeonggi',
    label: '경기',
    path: 'M111 54 L189 33 L268 42 L316 89 L299 160 L248 204 L204 180 L187 151 L137 157 L107 123 Z',
    labelX: 241,
    labelY: 88,
  },
  {
    id: 'gangwon',
    label: '강원',
    path: 'M286 43 L365 29 L470 50 L545 102 L533 171 L474 204 L406 177 L337 191 L299 158 L316 89 Z',
    labelX: 430,
    labelY: 101,
  },
  {
    id: 'chungnam',
    label: '충남',
    path: 'M91 220 L156 198 L229 221 L252 277 L222 331 L145 340 L92 301 L71 258 Z',
    labelX: 160,
    labelY: 268,
  },
  {
    id: 'sejong',
    label: '세종',
    path: 'M238 225 L274 216 L302 241 L294 278 L255 285 L232 257 Z',
    labelX: 267,
    labelY: 253,
  },
  {
    id: 'daejeon',
    label: '대전',
    path: 'M246 292 L286 282 L316 305 L304 344 L266 352 L239 326 Z',
    labelX: 278,
    labelY: 322,
  },
  {
    id: 'chungbuk',
    label: '충북',
    path: 'M321 194 L384 178 L438 211 L433 285 L398 331 L326 316 L301 276 L315 236 Z',
    labelX: 369,
    labelY: 249,
  },
  {
    id: 'jeonbuk',
    label: '전북',
    path: 'M132 351 L205 336 L274 366 L301 427 L265 477 L198 493 L136 456 L111 402 Z',
    labelX: 206,
    labelY: 407,
  },
  {
    id: 'gyeongbuk',
    label: '경북',
    path: 'M441 207 L505 190 L570 231 L586 314 L554 375 L503 406 L446 382 L410 329 L434 284 Z',
    labelX: 505,
    labelY: 286,
  },
  {
    id: 'daegu',
    label: '대구',
    path: 'M397 333 L437 320 L469 348 L464 389 L431 410 L394 390 L382 360 Z',
    labelX: 427,
    labelY: 368,
  },
  {
    id: 'gwangju',
    label: '광주',
    path: 'M111 478 L151 458 L187 480 L183 522 L148 542 L111 521 L98 498 Z',
    labelX: 143,
    labelY: 501,
  },
  {
    id: 'jeonnam',
    label: '전남',
    path: 'M75 514 L129 535 L174 524 L214 548 L273 527 L311 582 L282 651 L220 684 L140 671 L74 627 L47 570 Z',
    labelX: 179,
    labelY: 596,
  },
  {
    id: 'gyeongnam',
    label: '경남',
    path: 'M278 430 L350 405 L426 424 L482 459 L527 503 L498 547 L421 556 L352 532 L291 501 L255 466 Z',
    labelX: 384,
    labelY: 476,
  },
  {
    id: 'ulsan',
    label: '울산',
    path: 'M535 365 L580 351 L615 382 L612 431 L582 458 L546 438 L526 402 Z',
    labelX: 574,
    labelY: 405,
  },
  {
    id: 'busan',
    label: '부산',
    path: 'M512 502 L554 480 L598 502 L611 542 L584 572 L540 566 L508 539 Z',
    labelX: 558,
    labelY: 530,
  },
  {
    id: 'jeju',
    label: '제주',
    path: 'M234 704 L287 682 L366 688 L416 714 L392 746 L314 756 L245 739 Z',
    labelX: 326,
    labelY: 724,
  },
]

function normalizeRegionText(value) {
  return String(value ?? '').replace(/\s+/g, '').trim()
}

export function getNationalRegionId(value) {
  const normalized = normalizeRegionText(value)
  if (!normalized || normalized === normalizeRegionText(NATIONAL_ALL)) return null
  if (normalized === '전국' || normalized === '대한민국') return 'nationwide'

  const region = NATIONAL_REGION_OPTIONS.slice(1).find((option) =>
    option.aliases.some((alias) => normalized.includes(normalizeRegionText(alias))),
  )

  return region?.value ?? null
}

export function getNationalRegionLabel(regionId) {
  if (regionId === NATIONAL_ALL) return '전국'
  if (regionId === 'nationwide') return '전국 단위'

  return NATIONAL_REGION_OPTIONS.find((option) => option.value === regionId)?.label ?? '지역 미분류'
}
