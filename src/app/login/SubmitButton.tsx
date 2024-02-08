'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import ClipLoader from 'react-spinners/ClipLoader'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="h-11 mt-6" aria-disabled={pending}>
      {pending ? (
        <span className="w-[18px] h-[18px] border-2 border-b-transparent rounded-full inline-block box-border animate-spin text-slate-200"></span>
      ) : (
        <span>Log in</span>
      )}
    </Button>
  )
}
