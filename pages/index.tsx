import {
  Center,
  Container,
  Flex,
  IconButton,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { ImageBrick, ImageDrawer, Layout } from '@root/components'
import { useMediumScreen, usePagination, useTaggedQueries } from '@root/hooks'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Masonry, RenderComponentProps } from 'masonic'
import { useToggler } from 'molohooks'
import { NextSeo } from 'next-seo'
import { useCallback, useState } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

export default function Home() {
  const isMediumScreen = useMediumScreen()
  const query = useTaggedQueries()
  const {
    isLoadingPage,
    pageContent,
    canGoNext,
    canGoPrev,
    goNext,
    goPrev,
    pageNumber,
    refreshPage,
  } = usePagination(query)

  const [isImageOpen, openImage, closeImage] = useToggler()
  const [selectedImage, setSelectedImage] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  >()

  const masonicRender = useCallback(
    ({
      data,
    }: RenderComponentProps<
      firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    >) => {
      return (
        <ImageBrick
          post={data}
          onClick={() => {
            setSelectedImage(data)
            openImage()
          }}
        />
      )
    },
    []
  )

  return (
    <>
      <NextSeo title='Home' />

      <Layout>
        <Container maxWidth='full' marginTop={4} paddingBottom={12}>
          {isLoadingPage ? (
            <Center width='full' height='full'>
              <Spinner />
            </Center>
          ) : (
            <>
              <Masonry
                columnWidth={isMediumScreen ? 300 : 150}
                items={pageContent}
                columnGutter={isMediumScreen ? 12 : 8}
                render={masonicRender}
              />
              <Flex
                justifyContent='space-between'
                alignItems='center'
                marginTop={4}
              >
                <IconButton
                  aria-label='Previous page'
                  icon={<MdNavigateBefore />}
                  onClick={goPrev}
                  isDisabled={!canGoPrev}
                  colorScheme='blue'
                />
                <Text>{pageNumber.toString()}</Text>
                <IconButton
                  aria-label='Previous page'
                  icon={<MdNavigateNext />}
                  onClick={goNext}
                  isDisabled={!canGoNext}
                  colorScheme='blue'
                />
              </Flex>
            </>
          )}
        </Container>
      </Layout>

      {selectedImage && (
        <ImageDrawer
          post={selectedImage}
          onClose={closeImage}
          isOpen={isImageOpen}
          refreshFunc={refreshPage}
        />
      )}
    </>
  )
}
