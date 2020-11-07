import { atom } from 'recoil'

export const tags = atom<string[]>({
  key: 'tags',
  default: [],
})
