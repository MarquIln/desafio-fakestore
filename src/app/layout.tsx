'use client'

import { Providers } from '@/providers/theme-provider'
import GlobalStyle from './global-styles'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalStyle />
          {children}
        </Providers>
      </body>
    </html>
  )
}
