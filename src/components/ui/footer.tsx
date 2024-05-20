'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <section className="container py-8 lg:py-8 flex flex-col md:flex-row space-y-4 items-center justify-between px-4">
      <p>2024 Evento. All rights reserved.</p>
      <ul className="flex flex-row items-center space-x-4">
        <li>
          <Link href="#">Terms</Link>
        </li>
        <li>
          <Link href="#">Privacy</Link>
        </li>
      </ul>
    </section>
  )
}
