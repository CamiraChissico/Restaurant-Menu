export default function Loading() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#FFF0F5] text-[#5E3A4D] flex items-center justify-center">
      <div className="p-8 border-2 border-[#FF1493] rounded-xl bg-[rgba(255,240,245,0.95)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF1493] mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    </div>
  )
}
