import { useState } from 'react'

export default function useTags(defaultTags: string[] = []) {
  const [tags, setTags] = useState(defaultTags)

  const addTag = (tag: string) => setTags([...tags, tag])
  const removeTag = (tag: string) =>
    setTags(tags.filter(value => value !== tag))

  return {
    tags,
    addTag,
    removeTag,
  }
}
