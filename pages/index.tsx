import Nav from '@root/components/Nav'
import NeedAuth from '@root/components/NeedAuth'
import TagsBar from '@root/components/TagsBar'

export default function Home() {
  return (
    <>
      <NeedAuth>
        <Nav />
        <TagsBar />
      </NeedAuth>
    </>
  )
}
