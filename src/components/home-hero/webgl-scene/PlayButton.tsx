import { Html } from '@react-three/drei'
import { PlayButton as PlayButtonHtml } from '@components/play-button'
import { noop } from '@utils/noop'
import styles from './WebglScene.module.scss'

export const PlayButton = ({ onClick = noop, ...props }) => {
  return (
    <Html center zIndexRange={[8, 0]}>
      <div role="presentation" className={styles['playButtonContainer']} {...props}>
        <PlayButtonHtml onClick={onClick} />
      </div>
    </Html>
  )
}
