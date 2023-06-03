import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PortalX',
  description: 'Paitent Management System',
}

const RenderLogo = () => (
  <div className="p-10">
    <h1 className="font-bold text-2xl text-indigo-700">PortalX</h1>
    <h3>Next Generation Patient Management</h3>
  </div>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RenderLogo />
        {children}
      </body>
    </html>
  )
}
