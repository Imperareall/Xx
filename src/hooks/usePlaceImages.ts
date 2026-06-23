const allPlaceImages = import.meta.glob(
  '/{Yunnan,Macau,Shanghai,Nanjing,Chongqing,Beijing,HongKong,SGMYTH}/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}',
  { eager: true, as: 'url' }
)

const allPlaceVideos = import.meta.glob(
  '/{Yunnan,Macau,Shanghai,Nanjing,Chongqing,Beijing,HongKong,SGMYTH}/**/*.{mp4,MP4,mov,MOV,webm,WEBM}',
  { eager: true, as: 'url' }
)

export interface PlaceMedia {
  url: string
  type: 'image' | 'video'
}

export function usePlaceImages(folder: string): PlaceMedia[] {
  const prefix = folder.replace(/^\/|\/$/g, '')

  const images = Object.entries(allPlaceImages)
    .filter(([path]) => path.startsWith(`/${prefix}/`))
    .map(([, url]) => ({ url: url as string, type: 'image' as const }))

  const videos = Object.entries(allPlaceVideos)
    .filter(([path]) => path.startsWith(`/${prefix}/`))
    .map(([, url]) => ({ url: url as string, type: 'video' as const }))

  return [...images, ...videos]
}
