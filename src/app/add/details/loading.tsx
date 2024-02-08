'use client'

import Loader from '@/components/ui/loader'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center">
      <Loader />
    </div>
  )
}
