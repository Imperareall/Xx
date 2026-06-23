export interface Place {
  id: string
  name: string
  nameEn: string
  date: string
  lat: number
  lng: number
  folder: string
}

export const places: Place[] = [
  {
    id: 'yunnan',
    name: '云南', nameEn: 'Yunnan',
    date: '2023.03', lat: 25.0, lng: 102.7,
    folder: '/Yunnan/',
  },
  {
    id: 'macau',
    name: '澳门', nameEn: 'Macau',
    date: '2023.05', lat: 22.19, lng: 113.54,
    folder: '/Macau/',
  },
  {
    id: 'shanghai',
    name: '上海', nameEn: 'Shanghai',
    date: '2023.11', lat: 31.23, lng: 121.47,
    folder: '/Shanghai/',
  },
  {
    id: 'nanjing',
    name: '南京', nameEn: 'Nanjing',
    date: '2023.11', lat: 32.06, lng: 118.78,
    folder: '/Nanjing/',
  },
  {
    id: 'chongqing',
    name: '重庆', nameEn: 'Chongqing',
    date: '2024.01', lat: 29.56, lng: 106.55,
    folder: '/Chongqing/',
  },
  {
    id: 'beijing',
    name: '北京', nameEn: 'Beijing',
    date: '2024.11', lat: 39.90, lng: 116.40,
    folder: '/Beijing/',
  },
  {
    id: 'hongkong',
    name: '香港', nameEn: 'Hong Kong',
    date: '2025.03', lat: 22.32, lng: 114.17,
    folder: '/HongKong/',
  },
  {
    id: 'singapore',
    name: '新加坡', nameEn: 'Singapore',
    date: '2025.11', lat: 1.35, lng: 103.82,
    folder: '/SGMYTH/',
  },
  {
    id: 'kualalumpur',
    name: '吉隆坡', nameEn: 'Kuala Lumpur',
    date: '2025.11', lat: 3.14, lng: 101.69,
    folder: '/SGMYTH/',
  },
  {
    id: 'bangkok',
    name: '曼谷', nameEn: 'Bangkok',
    date: '2025.11', lat: 13.75, lng: 100.52,
    folder: '/SGMYTH/',
  },
]
