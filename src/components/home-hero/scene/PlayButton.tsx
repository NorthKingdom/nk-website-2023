import { useContext } from 'react'
import { Html } from '@react-three/drei'
import { PlayButton as PlayButtonHtml } from '@components/play-button'
import { noop } from '@utils/noop'
import { ShieldContainerContext } from './ShieldContainer'
import styles from './Scene.module.scss'

export const PlayButton = ({ onClick = noop }: { onClick: () => void }) => {
  const { hovered } = useContext(ShieldContainerContext)

  return (
    <Html center zIndexRange={[100, 0]}>
      <PlayButtonHtml onClick={onClick} className={styles['playButton']} data-visible={true} />
    </Html>
  )
}
