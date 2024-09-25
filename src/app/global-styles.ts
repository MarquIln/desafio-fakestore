import { createGlobalStyle } from 'styled-components'
import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html,
    body {
        max-width: 100vw;
        overflow-x: hidden;
        font-family: var(--font-inter), sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    :root {
        --bg: #ffffff; 
        --fg: #000000; 
        --headingcolor: #6767b3;
        --primary-button-bgcolor: #f26828;
        --primary-button-hovercolor: #f69f77;
        --primary-button-textcolor: #efebeb;
        --secondary-button-bgcolor: #121212;
        --secondary-button-hovercolor: #6a6666;
        --secondary-button-textcolor: #ffffff;

        --font-inter: ${inter.variable};
    }

    [data-theme='light'] {
        --bg: #ffffff; 
        --fg: #000000; 
        --headingcolor: #333333; 
        --primary-button-bgcolor: #fd3a3a; 
        --primary-button-hovercolor: #dd3232; 
        --primary-button-textcolor: #ffffff; 
        --secondary-button-bgcolor: #ffffff; 
        --secondary-button-hovercolor: #f2f2f2; 
        --secondary-button-textcolor: #000000; 
    }

    body {
        background-color: var(--bg);
        color: var(--fg);
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    [data-theme='light'] [data-hide-on-theme='light'] {
        display: none;
    }
`

export default GlobalStyle
