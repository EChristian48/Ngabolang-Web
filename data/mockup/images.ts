import { Post } from '../types'
import { acong, akong, wasman } from './users'

export const posts: Post[] = [
  {
    url: '/memes/wikrama.jpeg',
    location: 'Wikrama',
    id: '1',
    uid: akong.uid,
    username: akong.username,
  },
  {
    url: '/memes/me-using-dart.jpeg',
    location: 'Rumah',
    id: '2',
    uid: akong.uid,
    username: akong.username,
  },
  {
    url: '/memes/pain.jpeg',
    location: 'Internet',
    id: '3',
    uid: akong.uid,
    username: akong.username,
  },
  {
    url: '/memes/stackoverflow.jpeg',
    location: 'Internet',
    id: '4',
    uid: acong.uid,
    username: acong.username,
  },
  {
    url: '/memes/pikachu.png',
    location: 'Wikrama',
    id: '5',
    uid: acong.uid,
    username: acong.username,
  },
  {
    url: '/memes/ha.png',
    location: 'Rumah',
    id: '6',
    uid: acong.uid,
    username: acong.username,
  },
  {
    url: '/memes/handshake.jpg',
    location: 'Wikrama',
    id: '7',
    uid: wasman.uid,
    username: wasman.username,
  },
  {
    url: '/memes/java-py.png',
    location: 'Wikrama',
    id: '8',
    uid: wasman.uid,
    username: wasman.username,
  },
  {
    url: '/memes/hecker.jpg',
    location: 'Rumah',
    id: '9',
    uid: wasman.uid,
    username: wasman.username,
  },
]
