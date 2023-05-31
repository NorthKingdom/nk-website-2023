import React from 'react'
import { Description } from '@components/description'
import { VideoPlayer } from '@components/video-player'
import { TwoImageLayout } from '@components/two-image-layout'
import { CaseMediaGrid } from '@components/case-media-grid'
import { Media } from '@components/media'
import {
  CaseHero,
  DescriptionComponent,
  ResponsiveImage,
  Video,
  TwoImageComponent,
  CaseMediaGrid as CaseMediaGridType,
} from '@customTypes/cms'

interface ComponentResolverProps {
  components: (CaseHero | DescriptionComponent | ResponsiveImage | Video | TwoImageComponent | CaseMediaGridType)[]
}

export const ComponentResolver = ({ components }: ComponentResolverProps) => {
  return (
    <>
      {components.map((c, i: number) => {
        switch (c.__typename) {
          case 'CaseHero':
            return
          case 'DescriptionComponent':
            return (
              <Description key={`case-description-${i}`} copyLeft={c.copyLeft} copyRight={c.copyRight} link={c.link} />
            )
          case 'Video':
            return (
              <VideoPlayer
                src={c}
                controls={true}
                poster={c.posterImage.url}
                loop={c.loop}
                muted={c.muted}
                autoPlay={c.autoPlay}
                key={`case-video-${i}`}
              />
            )
          case 'ResponsiveImage':
            return (
              <div key={'responsive-image'} style={{ width: `100%`, height: `100vh`, position: `relative` }}>
                <Media key={`case-image-${i}`} style={{ objectFit: `cover` }} {...c} />
              </div>
            )
          case 'TwoImageComponent':
            return (
              <TwoImageLayout
                key={`case-twoimage-${i}`}
                leftSrcSet={c.imageOne}
                leftCaption={c.imageOneCaption}
                rightSrcSet={c.imageTwo}
                rightCaption={c.imageTwoCaption}
                leftAlt={c.imageOne.altText}
                rightAlt={c.imageTwo.altText}
              />
            )
          case 'CaseMediaGrid':
            return (
              <CaseMediaGrid
                key={`case-twoimage-${i}`}
                slotOne={c.slotOne}
                slotTwo={c.slotTwo}
                slotThree={c.slotThree}
                slotFour={c.slotFour}
              />
            )
          default:
            console.error(`dont have this component implemented in ComponentResolver.tsx`, c)
            return null
        }
      })}
    </>
  )
}
