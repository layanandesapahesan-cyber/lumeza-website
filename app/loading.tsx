'use client'

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-b from-gray-100 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded-lg w-full mb-2" />
            <div className="h-6 bg-gray-200 rounded-lg w-5/6" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              {/* Image Placeholder */}
              <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
              
              {/* Content Placeholder */}
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
