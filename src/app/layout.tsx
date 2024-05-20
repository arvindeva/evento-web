import type { Metadata } from 'next'
import { inter } from '@/app/fonts'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { ReactQueryProvider } from '@/components/react-query-provider'
import { Toaster } from '@/components/ui/toaster'
import NextTopLoader from 'nextjs-toploader'
import Footer from '@/components/ui/footer'

export const metadata: Metadata = {
  title: 'Evento - v.0.0',
  description: 'Event Scrapbook App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryProvider>
      <html suppressHydrationWarning lang="en">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            inter.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
            enableSystem
          >
            <NextTopLoader
              color="#B103FC"
              initialPosition={0.08}
              showSpinner={false}
              crawlSpeed={200}
              height={3}
            />
            {children}
            <Footer />
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ReactQueryProvider>
  )
}
