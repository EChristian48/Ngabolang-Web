import { tags } from '@root/state/tags'
import { useRecoilState } from 'recoil'

export default function useTags() {
  const [tagsState, setTagsState] = useRecoilState(tags)

  const addTag = (tag: string) => setTagsState([...tagsState, tag])
  const removeTag = (tag: string) =>
    setTagsState(tagsState.filter(value => value !== tag))

  return {
    tags: tagsState,
    addTag,
    removeTag,
  }
}
