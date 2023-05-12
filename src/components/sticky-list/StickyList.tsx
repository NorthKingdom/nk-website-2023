import React from 'react'
import styles from './StickyList.module.scss'
import { bemify } from '@utils/bemify'
import { VideoPlayer } from '@components/video-player'
import { Image } from '@components/image'
const bem = bemify(styles, 'stickyList')

interface StickyListProps {}

const ListItem = ({ isVideoAsset, header, copy }: any) => {
  return (
    <div className={bem('item')}>
      <div className={bem('leftContainer')}>
        <h3>{header}</h3>
        <div className={bem('stickyMediaContainer')}>
          {isVideoAsset ? (
            <VideoPlayer
              playsinline
              loop
              autoPlay
              poster={'/dummy/showreelposter/jpg'}
              src={[
                {
                  url: '/dummy/showreel23.mp4',
                },
              ]}
            />
          ) : (
            // <SlideShow
            <Image srcSet={['/dummy/temp-left-riot-img.jpg']} alt="temp alt" />
          )}
        </div>
      </div>
      <div className={bem('rightContainer')}>
        <p>{copy}</p>
      </div>
    </div>
  )
}

export const StickyList = (props: StickyListProps) => {
  return (
    <div className={styles['stickyList']}>
      <ListItem
        isVideoAsset={true}
        header={'Gaming'}
        copy={
          'Gaming and digital experiences is deeply rooted in our DNA. We have created and injected game elements into our projects over the last 15 years for brands like Vodafone, adidas & Disney. We have created our own games, such as Sparks, and we have worked closely in extending game universes and engaging communities with the biggest gaming players on earth, including EA, Mojang, King, Riot Games, Yuga Labs & Supercell.'
        }
      />
      <ListItem
        isVideoAsset={false}
        header={'Extended Reality'}
        copy={`We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`}
      />
      <ListItem
        isVideoAsset={true}
        header={'Extended Reality'}
        copy={`We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`}
      />
      <ListItem
        isVideoAsset={false}
        header={'Extended Reality'}
        copy={`We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`}
      />
      <ListItem
        isVideoAsset={true}
        header={'Extended Reality'}
        copy={`We have over 10 years of experience creating innovative VR/AR solutions for some of 
the biggest brands in the world on a wide variety of platforms.We've worked with Google, HBO, Disney, McDonalds and more to create cutting
edge AR/VR on web, mobile web, mobile apps and native solutions. We have over 10 years of experience creating
innovative VR/AR solutions for some of the biggest brands in the world on a wide variety of platforms.We've worked
with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web, mobile web, mobile apps and
native solutions.We've worked with Google, HBO, Disney, McDonalds and more to create cutting edge AR/VR on web,
mobile web, mobile apps and native solutions.`}
      />
    </div>
  )
}
