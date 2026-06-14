import { useAppStore } from '../store/useAppStore'
import type { MemoryItem } from '../types'

interface Props {
  item: MemoryItem
  index: number
}

export default function GridCard({ item }: Props) {
  const openDetail = useAppStore((s) => s.openDetail)

  return (
    <div
      onClick={() => openDetail(item.id)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '4px',
        overflow: 'hidden',
        breakInside: 'avoid',
      }}
    >
      <img
        src={item.imgSrc}
        alt={item.imgAlt}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </div>
  )
}
