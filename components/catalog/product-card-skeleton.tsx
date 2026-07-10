/** Placeholder card shown while catalog results load. Mirrors ProductCard's
 *  shape so there's no layout shift when real cards replace it. */
export function ProductCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className="aspect-square bg-line" />
      <div className="flex flex-1 flex-col px-[15px] pb-4 pt-3.5">
        <div className="h-3 w-14 rounded bg-line" />
        <div className="mt-2.5 h-4 w-full rounded bg-line" />
        <div className="mt-1.5 h-4 w-3/4 rounded bg-line" />
        <div className="mt-4 h-6 w-24 rounded bg-line" />
        <div className="mt-3.5 h-10 w-full rounded-[10px] bg-line" />
      </div>
    </div>
  );
}
