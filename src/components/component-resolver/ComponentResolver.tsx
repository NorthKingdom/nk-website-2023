import React from 'react'
import { Description } from '@components/description'
import { VideoPlayer } from '@components/video-player'
import { Image } from '@components/image'
import { TwoImageLayout } from '@components/two-image-layout'

interface ComponentResolverProps {
  components: any
}

export const ComponentResolver = ({ components }: ComponentResolverProps) => {
  return (
    <>
      {/* TODO :: // Fix any type here */}
      {components.map((c: any, i: number) => {
        switch (c.__typename) {
          case 'CaseHero':
            return
          case 'DescriptionComponent':
            return <Description key={`case-description-${i}`} copy={c.copy} header={c.header} link={c.link} />
          case 'Video':
            return (
              <VideoPlayer
                src={c.srcCollection.items || []}
                poster={c.posterImage.url}
                loop={c.loop}
                muted={c.muted}
                autoPlay={c.autoPlay}
                key={`case-video-${i}`}
              />
            )
          case 'ResponsiveImage':
            return <Image key={`case-image-${i}`} srcSet={[c.desktopImage.url, c.mobileImage.url]} alt={c.altText} />
          case 'TwoImageComponent':
            return (
              <TwoImageLayout
                key={`case-twoimage-${i}`}
                leftSrcSet={[c.imageOne.desktopImage.url, c.imageOne.mobileImage.url]}
                leftCaption={c.imageOneCaption}
                rightSrcSet={[c.imageOne.desktopImage.url, c.imageOne.mobileImage.url]}
                rightCaption={c.imageTwoCaption}
                leftAlt={c.imageOne.altText}
                rightAlt={c.imageTwo.altText}
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
