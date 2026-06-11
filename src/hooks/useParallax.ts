import { useScroll, useTransform, MotionValue } from 'framer-motion'

export function useParallax(offset: [string, string] = ['0%', '30%']): MotionValue<string> {
  const { scrollY } = useScroll()
  return useTransform(scrollY, [0, 800], offset)
}
