import { User } from '../types'
import { posts } from './images'

export const acong = new User('ucok', '1', posts.slice(5))
export const akong = new User(
  'akong',
  '2',
  posts.filter(post => parseInt(post.id) % 2 === 0)
)
export const wasman = new User('wasman', '3')
