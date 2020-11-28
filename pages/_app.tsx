import { ChakraProvider } from '@chakra-ui/react'
import '@root/firebase/init'
import { seoConfig } from '@root/next-seo.config'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'

const queryCache = new QueryCache()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='shortcut icon' href='globe.png' type='image/x-icon' />
        <meta
          name='google-site-verification'
          content='jwuGaag6OVJJ8VNJa6euHdXW3AYBhR9ZXf4mgY1K6Zk'
        />
      </Head>
      <DefaultSeo {...seoConfig} />

      <ChakraProvider>
        <RecoilRoot>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <Component {...pageProps} />
          </ReactQueryCacheProvider>
        </RecoilRoot>
      </ChakraProvider>
    </>
  )
}

export default MyApp
