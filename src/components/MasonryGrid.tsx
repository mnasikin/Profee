import { ReactNode } from 'react'

interface MasonryGridProps {
  children: ReactNode
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: string
  columnWidth?: number
}

export function MasonryGrid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = '1rem'
}: MasonryGridProps) {
  const columnClasses = [
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`
  ].filter(Boolean).join(' ')

  return (
    <div 
      className={`grid ${columnClasses} gap-4`}
      style={{ gap }}
    >
      {children}
    </div>
  )
}

// Alternative masonry using CSS columns for better masonry effect
export function MasonryColumns({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = '1rem',
  columnWidth = 320
}: MasonryGridProps) {
  const baseColumns = columns.sm ?? 1
  const mdColumns = columns.md ?? columns.sm ?? 2
  const lgColumns = columns.lg ?? columns.md ?? columns.sm ?? 3
  const xlColumns = columns.xl ?? columns.lg ?? columns.md ?? columns.sm ?? 4
  const columnCount = xlColumns
  const maxWidth = columnCount * columnWidth

  return (
    <div
      className="masonry-grid-wrapper"
      style={{
        ['--masonry-columns-sm' as any]: baseColumns,
        ['--masonry-columns-md' as any]: mdColumns,
        ['--masonry-columns-lg' as any]: lgColumns,
        ['--masonry-columns-xl' as any]: xlColumns
      }}
    >
      <div
        className="masonry-grid"
        style={{
          columnCount,
          columnGap: gap,
          columnFill: 'balance',
          width: `min(100%, ${maxWidth}px)`,
          ['--masonry-column-width' as any]: `${columnWidth}px`,
          ['--masonry-gap' as any]: gap
        }}
      >
        {children}
      </div>
    </div>
  )
}

// CSS for masonry grid
export const MasonryStyles = () => (
  <style jsx global>{`
    .masonry-grid-wrapper {
      width: 100%;
      text-align: center;
    }

    .masonry-grid {
      display: inline-block;
      text-align: left;
      max-width: calc(var(--masonry-column-width, 320px) * 4);
    }
    
    .masonry-grid > * {
      break-inside: avoid;
      margin-bottom: var(--masonry-gap, 1rem);
    }
    
    @media (max-width: 640px) {
      .masonry-grid {
        column-count: var(--masonry-columns-sm, 1) !important;
        max-width: 100%;
      }
    }
    
    @media (min-width: 641px) and (max-width: 768px) {
      .masonry-grid {
        column-count: var(--masonry-columns-md, 2) !important;
        max-width: calc(var(--masonry-column-width, 320px) * var(--masonry-columns-md, 2));
      }
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      .masonry-grid {
        column-count: var(--masonry-columns-lg, 3) !important;
        max-width: calc(var(--masonry-column-width, 320px) * var(--masonry-columns-lg, 3));
      }
    }
    
    @media (min-width: 1025px) {
      .masonry-grid {
        column-count: var(--masonry-columns-xl, 4) !important;
        max-width: calc(var(--masonry-column-width, 320px) * var(--masonry-columns-xl, 4));
      }
    }
  `}</style>
)
