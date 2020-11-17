import {
  Button,
  Flex,
  Image,
  Input,
  Progress,
  Text,
  useToast,
} from '@chakra-ui/core'
import { Layout } from '@root/components'
import NeedAuth from '@root/components/NeedAuth'
import { Post } from '@root/data/types'
import useControlledInput from '@root/hooks/useControlledInput'
import { useDrop } from 'ahooks'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'

const Upload: NextPage = () => {
  const [file, setFile] = useState<File>(null)
  const [imgSrc, setImgSrc] = useState<string>()
  const [progress, setProgress] = useState(0)
  const [location, setLocation] = useControlledInput()
  const inputFileRef = useRef<HTMLInputElement>()

  const [dropHandlers, { isHovering }] = useDrop({
    onFiles: files => setFile(files[0]),
  })

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files[0])

  useEffect(
    () => (file ? setImgSrc(URL.createObjectURL(file)) : setImgSrc('')),
    [file]
  )

  const toast = useToast()

  function uploadImage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { displayName, uid } = firebase.auth().currentUser

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
        displayName,
        uid,
        location,
        url: downloadUrl,
      }

      await firebase.firestore().collection('posts').add(post)

      toast({
        title: 'Upload success',
        isClosable: true,
        status: 'success',
      })
      setFile(null)
      inputFileRef.current.value = ''
      setProgress(0)
    }
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, observer, onError, onDone)
  }

  return (
    <NeedAuth>
      <Layout>
        <Flex
          as='form'
          width='full'
          direction='column'
          align='center'
          onSubmit={uploadImage}
        >
          <Flex
            height='200px'
            width='70%'
            backgroundColor='red.300'
            rounded='7px'
            justify='center'
            align='center'
            direction='column'
            {...dropHandlers}
          >
            <Text color='white'>Drop your file here</Text>

            <Text>Or</Text>

            <Input
              type='file'
              maxWidth='250px'
              onChange={inputHandler}
              ref={inputFileRef}
              backgroundColor='red.300'
              border='none'
            />
          </Flex>

          {progress > 0 && (
            <Progress
              value={progress}
              size='lg'
              isAnimated
              hasStripe
              color='green'
              width='70%'
              marginTop='1'
            />
          )}

          {imgSrc && (
            <>
              <Image alt='Selected image' src={imgSrc} height='200px' />
              <Input
                placeholder='Location...'
                value={location}
                onChange={setLocation}
              />
              <Button type='submit'>Upload</Button>
            </>
          )}
        </Flex>
      </Layout>
    </NeedAuth>
  )
}

export default Upload
