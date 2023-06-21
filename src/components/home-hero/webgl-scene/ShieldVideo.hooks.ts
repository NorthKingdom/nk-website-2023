import type { HomeHero } from '@customTypes/cms'
import { useEffect } from 'react'
import { useWebglSceneStore } from './WebglScene.store'
import { Color } from 'three'

/**
 * Syncs the light leak color subtitle file with the video
 * @param video
 * @param lightLeakColorVtt
 */

const isValidHexColor = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color)

export function useShieldLightLeakColorTextTrack(
  video: HTMLVideoElement,
  shieldLightLeakColorVtt: HomeHero['shieldLightLeakColorVtt']
) {
  const set = useWebglSceneStore((state) => state.set)

  useEffect(() => {
    if (!video) return

    // Add color cue track
    const track = document.createElement('track')
    track.kind = 'subtitles'
    track.srclang = 'en'
    track.src = shieldLightLeakColorVtt?.url ?? ''
    // track.src = '/dummy/test2.vtt'
    track.default = true

    video.appendChild(track)

    const textTrack = video.textTracks[0]
    textTrack.oncuechange = () => {
      // @ts-ignore
      const colorCue = textTrack.activeCues[0]?.text ?? ''
      if (!colorCue) return
      if (isValidHexColor(colorCue.trim())) {
        set({ lightColor: new Color(colorCue) })
      } else {
        console.warn(`Color cue ${colorCue} is not in valid HEX format`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video])
}
