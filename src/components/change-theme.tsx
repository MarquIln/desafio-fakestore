'use client'

import styled from 'styled-components'
import { TbSunFilled, TbMoonFilled } from 'react-icons/tb'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ChangeTheme = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  function handleThemeChange() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeToggleContainer>
      {resolvedTheme === 'dark' ? (
        <SunIcon size={30} onClick={handleThemeChange} />
      ) : (
        <MoonIcon size={30} onClick={handleThemeChange} />
      )}
    </ThemeToggleContainer>
  )
}

const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
`

const SunIcon = styled(TbSunFilled)`
  color: #fd3a3a;
`

const MoonIcon = styled(TbMoonFilled)`
  color: #fd3a3a;
`
