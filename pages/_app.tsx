import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import theme from '@root/chakra.theme'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CSSReset />
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default MyApp
