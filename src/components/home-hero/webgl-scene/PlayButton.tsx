import { Html } from '@react-three/drei'
import { PlayButton as PlayButtonHtml } from '@components/play-button'
import { noop } from '@utils/noop'
import styles from './WebglScene.module.scss'

export const PlayButton = ({ onClick = noop }: { onClick: () => void }) => {
  return (
    <Html center zIndexRange={[8, 0]}>
      <PlayButtonHtml onClick={onClick} className={styles['playButton']} data-visible={true} />
    </Html>
  )
}
