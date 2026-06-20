const allImages = import.meta.glob(
  '/couple/**/*.{jpg,jpeg,JPG,JPEG,png,PNG}',
  { eager: true, as: 'url' }
)

// 按编号自动配对 a/b
export function useCoupleImages() {
  const map: Record<string, { a?: string; b?: string }> = {}

  Object.entries(allImages).forEach(([path, url]) => {
    const match = path.match(/(\d+)_(a|b)\./i)
    if (!match) return
    const num = match[1]
    const side = match[2].toLowerCase() as 'a' | 'b'
    if (!map[num]) map[num] = {}
    map[num][side] = url as string
  })

  return Object.entries(map)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([num, pair]) => ({ num, a: pair.a, b: pair.b }))
    .filter(p => p.a && p.b)
}
