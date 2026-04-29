export const CardSubContent = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="flex items-center text-primary font-semibold before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full before:mr-2 mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 space-y-4">{children}</div>
    </div>
  )
}
