import firebase from 'firebase/app'
import { useToggler } from 'molohooks'
import { useEffect, useState } from 'react'

export type usePaginationOption = {
  pageSize?: number
}

export default function usePagination(
  query: firebase.firestore.Query<firebase.firestore.DocumentData>,
  option: usePaginationOption = {}
) {
  const { pageSize = 20 } = option
  const pageSizeWithOffset = pageSize + 1

  const [isLoadingPage, startLoadingPage, stopLoadingPage] = useToggler(true)
  const [pageNumber, setPageNumber] = useState(1)
  const [canGoNext, enableNext, disableNext] = useToggler(true)
  const [canGoPrev, enablePrev, disablePrev] = useToggler()

  const [pageContent, setPageContent] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  >([])
  const [lastDoc, setLastDoc] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  >()
  const [firstDoc, setFirstDoc] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  >()

  async function loadFirst() {
    startLoadingPage()
    enableNext()
    const snapshot = await query.limit(pageSizeWithOffset).get()

    if (snapshot.docs.length < pageSizeWithOffset) disableNext()
    setPageContent(snapshot.docs.slice(0, pageSize))
    stopLoadingPage()
  }

  async function goNext() {
    startLoadingPage()
    const snapshot = await query
      .startAfter(lastDoc)
      .limit(pageSizeWithOffset)
      .get()

    enablePrev()
    if (snapshot.docs.length < pageSizeWithOffset) disableNext()
    setPageContent(snapshot.docs.slice(0, pageSize))
    setPageNumber(current => current + 1)
    stopLoadingPage()
  }

  async function goPrev() {
    startLoadingPage()
    const snapshot = await query
      .endBefore(firstDoc)
      .limitToLast(pageSizeWithOffset)
      .get()

    enableNext()
    if (snapshot.docs.length < pageSizeWithOffset) disablePrev()
    setPageContent(snapshot.docs.slice(0, pageSize))
    setPageNumber(current => current - 1)
    stopLoadingPage()
  }

  useEffect(() => {
    const currentLastDoc = pageContent[pageContent.length - 1]
    const currentFirstDoc = pageContent[0]

    setLastDoc(currentLastDoc)
    setFirstDoc(currentFirstDoc)
  }, [pageContent])

  useEffect(() => {
    loadFirst()
  }, [query])

  const refreshPage = () => loadFirst()

  return {
    isLoadingPage,
    canGoNext,
    canGoPrev,
    pageContent,
    goNext,
    goPrev,
    pageNumber,
    refreshPage,
  }
}
