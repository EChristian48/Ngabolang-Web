import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { RecoilRoot } from 'recoil'
import { AppProps } from 'next/app'
import theme from '@root/chakra.theme'

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
