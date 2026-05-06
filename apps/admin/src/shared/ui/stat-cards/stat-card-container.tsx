export const StatCardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {children}
    </div>
  )
}
