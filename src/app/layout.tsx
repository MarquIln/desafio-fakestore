'use client'

import localFont from 'next/font/local'
import { Providers } from '@/providers/theme-provider'
import GlobalStyle from './global-styles'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <GlobalStyle />
          {children}
        </Providers>
      </body>
    </html>
  )
}
