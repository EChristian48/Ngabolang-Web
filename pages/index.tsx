import Navbar from '@root/components/Navbar'

type Img = {
  url: string
  location: string
}

const images: Img[] = [
  { url: '/memes/wikrama.jpeg', location: 'Wikrama' },
  { url: '/memes/me-using-dart.jpeg', location: 'Rumah' },
  { url: '/memes/pain.jpeg', location: 'Internet' },
  { url: '/memes/stackoverflow.jpeg', location: 'Internet' },
  { url: '/memes/pikachu.jpg', location: 'Wikrama' },
  { url: '/memes/ha.png', location: 'Rumah' },
  { url: '/memes/handshake.jpg', location: 'Wikrama' },
  { url: '/memes/java-py.png', location: 'Wikrama' },
  { url: '/memes/hecker.jpg', location: 'Rumah' },
]

const Home = () => {
  return (
    <>
      <Navbar />
    </>
  )
}

export default Home
