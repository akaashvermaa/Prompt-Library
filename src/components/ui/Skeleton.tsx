"use client";

export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div 
      className={`skeleton-base ${className || ""}`} 
      style={style}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bcard skeleton-card">
      <div className="row1">
        <Skeleton style={{ width: '80px', height: '14px' }} />
        <Skeleton style={{ width: '60px', height: '14px' }} />
      </div>
      <Skeleton style={{ width: '100%', height: '24px', marginTop: '12px' }} />
      <Skeleton style={{ width: '90%', height: '16px' }} />
      <Skeleton style={{ width: '40%', height: '16px' }} />
      <div className="foot" style={{ borderTop: 'none' }}>
        <div className="badges">
          <Skeleton style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
          <Skeleton style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
        </div>
        <Skeleton style={{ width: '60px', height: '24px', borderRadius: '6px' }} />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="browse-grid">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
