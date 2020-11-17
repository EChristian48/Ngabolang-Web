import { Layout } from '@root/components'
import { Post } from '@root/data/types'
import useTags from '@root/hooks/useTags'
import {
  LoadMoreItemsCallback,
  Masonry as Masonic,
  useInfiniteLoader,
} from 'masonic'
import { useEffect, useState } from 'react'

const Home = () => {
  const { tags } = useTags()

  const [images, setImages] = useState([])

  useEffect(() => {}, [tags])

  const maybe = useInfiniteLoader<Post, LoadMoreItemsCallback<Post>>(
    async (start, stop, cur) => {
      ;(() => {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(setImages([...images, ...images]))
          }, 200)
        })
      })()
    },
    {
      isItemLoaded: (index, item) => !!item[index],
    }
  )

  return (
    <Layout>
      <Masonic
        key={tags.join(' ').toUpperCase()}
        items={images}
        onRender={maybe}
        render={({ data: { url, location, displayName } }) => {
          return (
            <div>
              {displayName}
              {location}
              <img src={url} key={url} />
            </div>
          )
        }}
      />
    </Layout>
  )
}

export default Home
