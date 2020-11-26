import firebase from 'firebase/app'
import { useEffect, useState } from 'react'
import useTags from './useTags'

export default function useTaggedQueries() {
  const { tags } = useTags()

  function determineQuery() {
    return tags.length
      ? firebase
          .firestore()
          .collection('posts')
          .where(
            'location',
            'in',
            tags.map(tag => tag.toUpperCase())
          )
          .orderBy('date', 'desc')
      : firebase.firestore().collection('posts').orderBy('date', 'desc')
  }

  const [query, setQuery] = useState<
    firebase.firestore.Query<firebase.firestore.DocumentData>
  >(() => determineQuery())

  useEffect(() => {
    setQuery(determineQuery())
  }, [tags])

  return query
}
