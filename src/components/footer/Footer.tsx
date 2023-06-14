import React, { useRef } from 'react'
import styles from './Footer.module.scss'
import { bemify } from '@utils/bemify'
import { useBreakpointFrom } from '@hooks/use-breakpoint'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { useGlobalStateStore } from '@store'
import Link from 'next/link'

const bem = bemify(styles, 'footer')

interface FooterProps {
  theme?: 'light' | 'dark'
}

const FOOTER_QUERY = gql`
  query FooterQuery {
    footer(id: "6sB0eIDYQXM5x0g8VE0JwE") {
      statement
      links: linksCollection(limit: 10) {
        items {
          copy
          url
        }
      }
    }
  }
`

export const Footer = ({ theme = 'dark' }: FooterProps) => {
  const lenis = useGlobalStateStore((state) => state.lenis)
  const $footer = useRef<HTMLDivElement>(null)
  const bpFromTablet = useBreakpointFrom('tablet')
  const { data } = useQuery(FOOTER_QUERY)

  const Wordmark = bpFromTablet ? WordmarkOneLine : WordmarkTwoLines
  const scrollToTopCopy = bpFromTablet ? '↑ Back to north' : '↑'

  const onScrollToTop = () => {
    if (!lenis) return
    lenis.scrollTo(0)
  }

  return (
    <footer className={bem()} ref={$footer} data-theme={theme}>
      <Wordmark>
        <div className={bem('content')}>
          <Link className={bem('noaCta')} href="https://www.thenorthalliance.com/">
            {data?.footer?.statement}
          </Link>
          <button className={bem('scrollTopCta')} onClick={onScrollToTop}>
            {scrollToTopCopy}
          </button>
        </div>
      </Wordmark>
    </footer>
  )
}

const WordmarkOneLine = ({ children }: { children: React.ReactNode }) => (
  <div aria-hidden={false} className={bem('wordmarkContainer')}>
    <svg className={bem('svg')} viewBox="0 0 1400 202" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.401602 157H21.2835V22.1376C21.2835 21.05 21.7186 20.3974 22.8062 20.3974C23.8938 20.3974 24.5463 20.6149 24.9814 21.8113L74.7934 157H113.077V0.385591H92.195V135.248C92.195 136.336 91.76 136.879 90.6724 136.879C89.5848 136.879 88.9322 136.771 88.4972 135.574L38.6851 0.385591H0.401602V157ZM182.843 40.6268C149.998 40.6268 123.895 61.2912 123.895 100.445C123.895 139.598 149.998 160.263 182.843 160.263C215.689 160.263 241.791 139.598 241.791 100.445C241.791 61.2912 215.689 40.6268 182.843 40.6268ZM182.843 58.0284C205.683 58.0284 221.997 73.2548 221.997 100.445C221.997 127.635 205.683 142.861 182.843 142.861C160.004 142.861 143.69 127.635 143.69 100.445C143.69 73.2548 160.004 58.0284 182.843 58.0284ZM250.507 157H270.084V92.8316C270.084 71.0796 280.09 62.5963 299.014 62.5963H314.676V43.4546H302.059C286.615 43.4546 278.785 48.0225 273.782 59.0072C273.347 60.0948 272.912 60.7474 271.607 60.7474C270.519 60.7474 270.084 60.3124 270.084 59.2248V43.8896H250.507V157ZM318.333 61.2912H344.435V124.372C344.435 146.45 354.985 157 377.063 157H396.64V139.598H389.027H367.166C366.078 139.598 365.534 139.381 364.882 138.728C364.229 138.185 363.903 137.423 363.903 136.336C363.903 134.16 364.012 129.81 364.012 114.584V61.2912H396.64V43.8896H364.012V13.4368H344.435V43.8896H318.333V61.2912ZM403.204 157H422.781V98.2696C422.781 71.0796 435.832 58.0284 457.584 58.0284C477.161 58.0284 488.037 68.9044 488.037 89.5688V157H507.614V86.306C507.614 56.9408 490.321 40.6268 462.044 40.6268C445.295 40.6268 433.766 46.6086 426.697 56.397C425.827 57.4846 425.392 58.1372 424.304 58.1372C423.216 58.1372 422.781 57.7021 422.781 56.6145V0.385591H403.204V157ZM695.217 0.385591H669.223L591.024 74.3424V0.385591H570.143V157H591.024V101.641L612.233 81.9556L671.289 157H694.564V152.65L627.024 68.1431L695.217 4.73599V0.385591ZM699.312 0.385591V26.488H727.59V0.385591H699.312ZM703.662 43.8896V157H723.239V43.8896H703.662ZM738.568 157H758.144V98.2696C758.144 71.0796 771.196 58.0284 792.948 58.0284C812.524 58.0284 823.4 68.9044 823.4 89.5688V157H842.977V86.306C842.977 56.9408 825.684 40.6268 797.407 40.6268C780.658 40.6268 769.129 46.6086 762.06 56.397C761.19 57.4846 760.755 58.1372 759.667 58.1372C758.579 58.1372 758.144 57.7021 758.144 56.6145V43.8896H738.568V157ZM851.719 160.698C854.003 184.625 873.253 201.592 908.274 201.592C943.947 201.592 965.264 180.927 965.264 145.036V43.8896H952.213L948.08 57.2671C947.645 58.5722 947.428 59.2248 946.123 59.2248C945.035 59.2248 944.165 58.7897 942.642 56.832C933.289 45.521 920.89 40.6268 905.338 40.6268C876.842 40.6268 850.849 60.2036 850.849 97.182C850.849 134.16 876.842 153.737 905.338 153.737C920.89 153.737 933.724 149.278 942.425 137.858C943.077 136.988 943.512 136.662 944.382 136.662C945.252 136.662 945.687 137.097 945.687 137.967V146.124C945.687 170.269 932.092 184.19 908.492 184.19C887.61 184.19 875.755 174.837 873.471 160.698H851.719ZM870.643 97.182C870.643 72.1672 888.045 58.0284 908.709 58.0284C929.373 58.0284 946.775 72.1672 946.775 97.182C946.775 122.197 929.373 136.336 908.709 136.336C888.045 136.336 870.643 122.197 870.643 97.182ZM973.914 100.445C973.914 141.665 1002.19 160.263 1029.49 160.263C1045.59 160.263 1057.99 155.151 1067.01 144.058C1067.67 143.187 1068.32 142.535 1069.41 142.535C1070.49 142.535 1070.93 143.187 1070.93 144.275V157H1090.5V0.385591H1070.93V56.6145C1070.93 57.7021 1070.49 58.3547 1069.41 58.3547C1068.32 58.3547 1067.67 57.7021 1067.01 56.832C1057.99 45.7385 1045.59 40.6268 1029.49 40.6268C1002.19 40.6268 973.914 59.116 973.914 100.445ZM993.708 100.445C993.708 73.2548 1010.02 58.0284 1032.86 58.0284C1055.7 58.0284 1072.02 73.2548 1072.02 100.445C1072.02 127.635 1055.7 142.861 1032.86 142.861C1010.02 142.861 993.708 127.635 993.708 100.445ZM1158.05 40.6268C1125.2 40.6268 1099.1 61.2912 1099.1 100.445C1099.1 139.598 1125.2 160.263 1158.05 160.263C1190.89 160.263 1216.99 139.598 1216.99 100.445C1216.99 61.2912 1190.89 40.6268 1158.05 40.6268ZM1158.05 58.0284C1180.89 58.0284 1197.2 73.2548 1197.2 100.445C1197.2 127.635 1180.89 142.861 1158.05 142.861C1135.21 142.861 1118.89 127.635 1118.89 100.445C1118.89 73.2548 1135.21 58.0284 1158.05 58.0284ZM1225.71 157H1245.29V92.8316C1245.29 67.8168 1259.43 58.0284 1274.76 58.0284C1293.25 58.0284 1302.93 67.8168 1302.93 87.3936V157H1322.51V92.8316C1322.51 67.8168 1336.65 58.0284 1351.98 58.0284C1370.47 58.0284 1380.15 67.8168 1380.15 87.3936V157H1399.73V85.3272C1399.73 58.1372 1384.72 40.6268 1358.51 40.6268C1339.26 40.6268 1327.73 47.6962 1321.75 60.0948C1320.88 61.835 1320.44 62.27 1319.35 62.27C1317.94 62.27 1317.61 61.6175 1316.96 60.5299C1310.65 48.3487 1298.91 40.6268 1281.29 40.6268C1265.84 40.6268 1255.4 46.3911 1249.2 56.0707C1248.12 57.5934 1247.68 58.0284 1246.81 58.0284C1245.72 58.0284 1245.29 57.5934 1245.29 56.5058V43.8896H1225.71V157Z"
        fill="black"
      />
    </svg>
    {children}
  </div>
)

const WordmarkTwoLines = ({ children }: { children: React.ReactNode }) => (
  <div aria-hidden={false} className={bem('wordmarkContainer')}>
    <svg className={bem('svg')} viewBox="0 0 336 155" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.365168 63H8.7229V9.02298C8.7229 8.58768 8.89702 8.3265 9.33232 8.3265C9.76762 8.3265 10.0288 8.41356 10.2029 8.89239L30.1396 63H45.4621V0.317008H37.1044V54.294C37.1044 54.7293 36.9302 54.947 36.4949 54.947C36.0596 54.947 35.7985 54.9034 35.6244 54.4246L15.6877 0.317008H0.365168V63ZM74.2557 16.4231C61.1097 16.4231 50.6626 24.6937 50.6626 40.3645C50.6626 56.0352 61.1097 64.3059 74.2557 64.3059C87.4018 64.3059 97.8489 56.0352 97.8489 40.3645C97.8489 24.6937 87.4018 16.4231 74.2557 16.4231ZM74.2557 23.3878C83.397 23.3878 89.9265 29.482 89.9265 40.3645C89.9265 51.2469 83.397 57.3411 74.2557 57.3411C65.1145 57.3411 58.585 51.2469 58.585 40.3645C58.585 29.482 65.1145 23.3878 74.2557 23.3878ZM102.208 63H110.043V37.3174C110.043 28.6114 114.048 25.2161 121.622 25.2161H127.891V17.5548H122.841C116.66 17.5548 113.526 19.3831 111.523 23.7796C111.349 24.2149 111.175 24.4761 110.653 24.4761C110.218 24.4761 110.043 24.302 110.043 23.8667V17.7289H102.208V63ZM125.872 24.6937H136.319V49.941C136.319 58.7776 140.542 63 149.378 63H157.213V56.0352H154.166H145.417C144.982 56.0352 144.764 55.9482 144.503 55.687C144.242 55.4693 144.111 55.1646 144.111 54.7293C144.111 53.8587 144.154 52.1175 144.154 46.0234V24.6937H157.213V17.7289H144.154V5.54059H136.319V17.7289H125.872V24.6937ZM160.711 63H168.547V39.4939C168.547 28.6114 173.77 23.3878 182.476 23.3878C190.312 23.3878 194.665 27.7408 194.665 36.0115V63H202.5V34.7056C202.5 22.9525 195.579 16.4231 184.261 16.4231C177.558 16.4231 172.943 18.8172 170.114 22.7349C169.766 23.1702 169.592 23.4314 169.156 23.4314C168.721 23.4314 168.547 23.2572 168.547 22.8219V0.317008H160.711V63ZM50.4245 74.317H40.0209L8.7229 103.917V74.317H0.365168V137H8.7229V114.843L17.2112 106.964L40.8479 137H50.1633V135.259L23.1313 101.436L50.4245 76.0582V74.317ZM51.1931 74.317V84.7642H62.5108V74.317H51.1931ZM52.9343 91.7289V137H60.7696V91.7289H52.9343ZM67.7752 137H75.6106V113.494C75.6106 102.611 80.8342 97.3878 89.5402 97.3878C97.3755 97.3878 101.729 101.741 101.729 110.011V137H109.564V108.706C109.564 96.9525 102.643 90.4231 91.3249 90.4231C84.6213 90.4231 80.0071 92.8172 77.1777 96.7349C76.8294 97.1702 76.6553 97.4314 76.22 97.4314C75.7847 97.4314 75.6106 97.2572 75.6106 96.8219V91.7289H67.7752V137ZM113.933 138.48C114.847 148.057 122.552 154.847 136.569 154.847C150.847 154.847 159.378 146.577 159.378 132.212V91.7289H154.155L152.501 97.0831C152.327 97.6055 152.239 97.8667 151.717 97.8667C151.282 97.8667 150.934 97.6925 150.324 96.909C146.581 92.3819 141.618 90.4231 135.393 90.4231C123.989 90.4231 113.585 98.2584 113.585 113.059C113.585 127.859 123.989 135.694 135.393 135.694C141.618 135.694 146.755 133.909 150.237 129.339C150.498 128.991 150.672 128.86 151.021 128.86C151.369 128.86 151.543 129.034 151.543 129.382V132.647C151.543 142.311 146.102 147.882 136.656 147.882C128.298 147.882 123.553 144.139 122.639 138.48H113.933ZM121.507 113.059C121.507 103.047 128.472 97.3878 136.743 97.3878C145.014 97.3878 151.978 103.047 151.978 113.059C151.978 123.07 145.014 128.729 136.743 128.729C128.472 128.729 121.507 123.07 121.507 113.059ZM163.711 114.364C163.711 130.862 175.029 138.306 185.955 138.306C192.397 138.306 197.36 136.26 200.973 131.82C201.234 131.472 201.495 131.211 201.93 131.211C202.365 131.211 202.54 131.472 202.54 131.907V137H210.375V74.317H202.54V96.8219C202.54 97.2572 202.365 97.5184 201.93 97.5184C201.495 97.5184 201.234 97.2572 200.973 96.909C197.36 92.469 192.397 90.4231 185.955 90.4231C175.029 90.4231 163.711 97.8231 163.711 114.364ZM171.633 114.364C171.633 103.482 178.163 97.3878 187.304 97.3878C196.445 97.3878 202.975 103.482 202.975 114.364C202.975 125.247 196.445 131.341 187.304 131.341C178.163 131.341 171.633 125.247 171.633 114.364ZM238.278 90.4231C225.132 90.4231 214.685 98.6937 214.685 114.364C214.685 130.035 225.132 138.306 238.278 138.306C251.424 138.306 261.871 130.035 261.871 114.364C261.871 98.6937 251.424 90.4231 238.278 90.4231ZM238.278 97.3878C247.42 97.3878 253.949 103.482 253.949 114.364C253.949 125.247 247.42 131.341 238.278 131.341C229.137 131.341 222.608 125.247 222.608 114.364C222.608 103.482 229.137 97.3878 238.278 97.3878ZM266.231 137H274.066V111.317C274.066 101.306 279.725 97.3878 285.863 97.3878C293.263 97.3878 297.137 101.306 297.137 109.141V137H304.972V111.317C304.972 101.306 310.631 97.3878 316.769 97.3878C324.169 97.3878 328.043 101.306 328.043 109.141V137H335.878V108.314C335.878 97.4314 329.871 90.4231 319.381 90.4231C311.676 90.4231 307.062 93.2525 304.667 98.2149C304.319 98.9114 304.145 99.0855 303.71 99.0855C303.144 99.0855 303.013 98.8243 302.752 98.389C300.227 93.5137 295.526 90.4231 288.474 90.4231C282.293 90.4231 278.114 92.7301 275.633 96.6043C275.198 97.2137 275.024 97.3878 274.675 97.3878C274.24 97.3878 274.066 97.2137 274.066 96.7784V91.7289H266.231V137Z"
        fill="white"
      />
    </svg>
    {children}
  </div>
)
