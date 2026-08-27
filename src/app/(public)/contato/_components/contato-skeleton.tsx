import { Skeleton } from '@/components/ui/skeleton'

/** Espelha o layout de ContatoSection enquanto os canais carregam. */
export function ContatoSkeleton() {
  return (
    <>
      <div className="flex items-end justify-between gap-6 border-b border-white/15 pt-8 pb-6">
        <Skeleton className="h-3 w-16 bg-white/10" />
        <Skeleton className="h-3 w-32 bg-white/10" />
      </div>

      <div className="py-12 lg:py-14">
        <Skeleton className="h-14 w-64 bg-white/10 sm:h-20 sm:w-96" />
        <Skeleton className="mt-6 h-3 w-full max-w-md bg-white/10" />
        <Skeleton className="mt-2 h-3 w-64 bg-white/10" />
      </div>

      <div className="grid flex-1 gap-10 pb-4 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <Skeleton className="h-3 w-14 bg-white/10" />
          <div className="mt-6 flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-[#556040]/10 bg-[#EDE4D2] p-4"
              >
                <Skeleton className="size-11 shrink-0 rounded-full bg-[#556040]/10" />
                <div className="flex-1">
                  <Skeleton className="h-2 w-16 bg-[#556040]/10" />
                  <Skeleton className="mt-2.5 h-3 w-40 bg-[#556040]/10" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="h-3 w-20 bg-white/10" />
          <Skeleton className="mt-6 h-[280px] rounded-2xl bg-white/10 sm:h-[360px]" />
          <div className="mt-4 rounded-2xl border border-[#556040]/10 bg-[#EDE4D2] p-6">
            <Skeleton className="h-6 w-36 bg-[#556040]/10" />
            <Skeleton className="mt-3 h-3 w-48 bg-[#556040]/10" />
            <Skeleton className="mt-2 h-3 w-40 bg-[#556040]/10" />
            <Skeleton className="mt-5 h-2.5 w-52 bg-[#556040]/10" />
          </div>
        </div>
      </div>
    </>
  )
}
