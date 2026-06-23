const allPlaceImages = import.meta.glob(
  '/{Yunnan,Macau,Shanghai,Nanjing,Chongqing,Beijing,HongKong,SGMYTH}/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}',
  { eager: true, as: 'url' }
)

export function usePlaceImages(folder: string): string[] {
  const prefix = folder.replace(/^\/|\/$/g, '')
  return Object.entries(allPlaceImages)
    .filter(([path]) => path.startsWith(`/${prefix}/`))
    .map(([, url]) => url as string)
}
