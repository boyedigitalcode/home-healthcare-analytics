import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Healthcare Analytics',
  description: 'Analytics platform for home healthcare agencies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden md:flex w-64 bg-white border-r">
            <div className="p-6 font-semibold">
              Home Health Analytics
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
