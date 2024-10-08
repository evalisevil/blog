export default function Loading() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-72">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500" />
        </div>
        <p className="text-center mt-4 text-gray-500">Loading...</p>
      </div>
    </main>
  )
}
