'use client'

import Loader from '@/components/ui/loader'

export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center">
      <Loader />
    </div>
  )
}
