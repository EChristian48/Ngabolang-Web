import {
  Button,
  Container,
  Flex,
  Image,
  Input,
  Progress,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Layout } from '@root/components'
import { Post } from '@root/data/types'
import { useDrop } from 'ahooks'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import { useInputHandler } from 'molohooks'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'

const Upload: NextPage = () => {
  const [file, setFile] = useState<File>(null)
  const [imgSrc, setImgSrc] = useState<string>()
  const [progress, setProgress] = useState(-1)
  const [location, setLocation, clearLocation] = useInputHandler()
  const inputFileRef = useRef<HTMLInputElement>()

  const [dropHandlers] = useDrop({
    onFiles: files => setFile(files[0]),
  })

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files[0])

  useEffect(
    () => (file ? setImgSrc(URL.createObjectURL(file)) : setImgSrc('')),
    [file]
  )

  const toast = useToast()

  function uploadImage(e: FormEvent<HTMLDivElement>) {
    e.preventDefault()

    const { uid } = firebase.auth().currentUser

    const task = firebase
      .storage()
      .ref()
      .child(`posts/${uid}-${file.name}-${Date.now()}`)
      .put(file)

    function observer(snapshot: firebase.storage.UploadTaskSnapshot) {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    }

    function onError(error: firebase.storage.FirebaseStorageError) {
      toast({
        title: 'Error uploading file',
        description: error.message,
        isClosable: true,
        status: 'error',
      })
    }

    async function onDone() {
      const downloadUrl = await task.snapshot.ref.getDownloadURL()

      const post: Post = {
        uid,
        location: location.toUpperCase(),
        url: downloadUrl,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        thumbUrl:
          'https://firebasestorage.googleapis.com/v0/b/ngabolang.appspot.com/o/posts%2Floading-indicator-view.jpg?alt=media&token=a6bdb1c8-6988-4fb4-b3c0-1029e823169f',
      }

      await firebase.firestore().collection('posts').add(post)

      toast({
        title: 'Upload success',
        isClosable: true,
        status: 'success',
      })

      clearLocation()
      setFile(null)
      inputFileRef.current.value = ''
      setProgress(-1)
    }
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, observer, onError, onDone)
  }

  return (
    <>
      <NextSeo title='Upload Foto' />

      <Layout>
        <Container maxWidth={['100%', , '80%']} marginTop={4}>
          <SimpleGrid columns={[1, , 2]} spacing={4}>
            <Flex
              height={['300px', , '400px']}
              borderWidth='4px'
              borderStyle='dashed'
              borderColor='blue.500'
              backgroundColor='blue.100'
              rounded='7px'
              justify='center'
              align='center'
              direction='column'
              {...dropHandlers}
            >
              <Text>Drop your file here</Text>

              <Text>Or</Text>

              <label>
                <input
                  type='file'
                  onChange={inputHandler}
                  ref={inputFileRef}
                  style={{ display: 'none' }}
                />
                <Button as='span' colorScheme='blue'>
                  Select Image
                </Button>
              </label>
            </Flex>

            <VStack spacing={2} as='form' onSubmit={uploadImage}>
              {imgSrc && (
                <>
                  <Image alt='Selected image' src={imgSrc} />

                  <Input
                    placeholder='Tambah Lokasi...'
                    isRequired
                    value={location}
                    size='lg'
                    onChange={setLocation}
                    isReadOnly={progress !== -1}
                  />

                  <Button
                    type='submit'
                    isFullWidth
                    colorScheme='blue'
                    isLoading={progress !== -1}
                  >
                    Upload
                  </Button>

                  {progress >= 0 && (
                    <Progress
                      value={progress}
                      size='lg'
                      isAnimated
                      hasStripe
                      color='green'
                      width='100%'
                      marginTop='1'
                    />
                  )}
                </>
              )}
            </VStack>
          </SimpleGrid>
        </Container>
      </Layout>
    </>
  )
}

export default Upload
