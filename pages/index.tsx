import { Box, IMenu } from '@chakra-ui/core'
import { Layout } from '@root/components'
import Navbar from '@root/components/Navbar'
import fs from 'fs'
import path from 'path'

import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  CellRenderer,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized'

import { LoadMoreItemsCallback, Masonry as Masonic, useInfiniteLoader } from 'masonic'
import { GetStaticProps } from 'next'
import { type } from 'os'
import { FC, useState } from 'react'

type Img = {
  url: string
  location: string
}

type HomeProps = {
  images: Img[]
}

const Home: FC<HomeProps> = ({}) => {
  const [images, setImages] = useState<Img[]>([
    { url: '/memes/wikrama.jpeg', location: 'Wikrama' },
    { url: '/memes/me-using-dart.jpeg', location: 'Rumah' },
    { url: '/memes/pain.jpeg', location: 'Internet' },
    { url: '/memes/stackoverflow.jpeg', location: 'Internet' },
    { url: '/memes/pikachu.png', location: 'Wikrama' },
    { url: '/memes/ha.png', location: 'Rumah' },
    { url: '/memes/handshake.jpg', location: 'Wikrama' },
    { url: '/memes/java-py.png', location: 'Wikrama' },
    { url: '/memes/hecker.jpg', location: 'Rumah' },
  ])

  const getImages = () =>
    new Promise<Img[]>((resolve, reject) => {
      setTimeout(
        () =>
          resolve([
            { url: '/memes/wikrama.jpeg', location: 'Wikrama' },
            { url: '/memes/me-using-dart.jpeg', location: 'Rumah' },
            { url: '/memes/pain.jpeg', location: 'Internet' },
            { url: '/memes/stackoverflow.jpeg', location: 'Internet' },
            { url: '/memes/pikachu.png', location: 'Wikrama' },
            { url: '/memes/ha.png', location: 'Rumah' },
            { url: '/memes/handshake.jpg', location: 'Wikrama' },
            { url: '/memes/java-py.png', location: 'Wikrama' },
            { url: '/memes/hecker.jpg', location: 'Rumah' },
          ]),
        500
      )
    })

  const maybe = useInfiniteLoader<Img, LoadMoreItemsCallback<Img>>(async (start, stop, cur) => {
    const newImg = await getImages()
    setImages([...images, ...newImg])
  }, {
    isItemLoaded: (index, item) => !!item[index]
  })

  return (
    <>
      <Navbar />

      <Layout>
        <Masonic
          items={images}
          onRender={maybe}
          render={({ data: { url, location } }) => {
            return <img src={url} key={url} />
          }}
        />
      </Layout>
    </>
  )
}

export default Home
