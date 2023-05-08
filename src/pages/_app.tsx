import '@styles/reset.css'
import '@styles/globals.scss'
import Script from 'next/script'
import Head from 'next/head'
import getConfig from 'next/config'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig()

  return (
    <>
      <Head>
        <title>North Kingdom</title>
        <meta name="version" content={publicRuntimeConfig?.version}></meta>
        <link rel="icon" href="/images/shield.ico" />
        <meta
          name="viewport"
          content="height=device-height, 
          width=device-width, initial-scale=1.0, 
          minimum-scale=1.0, maximum-scale=5.0"
        ></meta>

        <meta property="og:title" content="North Kingdom" key="ogtitle" />
        <meta name="twitter:title" content="North Kingdom" key="twittertitle" />

        <meta name="description" content={'We are an experience design company.'} key="description" />
        <meta property="og:description" content={'We are an experience design company.'} key="ogdescription" />
        <meta name="twitter:description" content={'We are an experience design company.'} key="twitterdescription" />

        <meta property="og:image" content={`/images/og-image.png`} key="ogimage" />
        <meta name="twitter:image" content={`/images/og-image.png`} key="twitterimage" />

        <meta property="og:url" content="https://www.northkingdom.com/" key="ogurl" />
        <meta property="og:site_name" content="North Kingdom" key="ogsitename" />

        <link rel="preload" href="/fonts/FKGroteskNeue/woff2/FKGroteskNeue-Regular.woff2" as="font" type="font/woff2" />

        <link rel="preload" href="/fonts/FKGroteskNeue/woff2/FKGroteskNeue-Bold.woff2" as="font" type="font/woff2" />

        <link
          rel="preload"
          href="/fonts/FKRasterGrotesk/woff2/FKRasterGrotesk-Blended.woff2"
          as="font"
          type="font/woff2"
        />
      </Head>
      {/* Google Analytics */}
      <Script
        id="google-analtics"
        lazyOnload
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="google-analytics-config"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
