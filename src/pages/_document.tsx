import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head />
      <body>
        <Main />
        <NextScript />

        {/* Empty script tag as chrome bug fix, see https://stackoverflow.com/a/42969608/943337 */}
        <script> </script>
      </body>
    </Html>
  )
}
