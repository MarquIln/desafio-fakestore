'use client'

import { ThemeProvider } from 'next-themes'
import StyledComponentsRegistry from './registry-theme'
import GlobalStyle from '@/app/global-styles'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider defaultTheme="light">
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}

export default Providers
