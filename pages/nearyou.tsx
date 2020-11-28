import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Collapse,
  Heading,
  SimpleGrid,
  SlideFade,
  Spinner,
  Tag,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Layout, LinkWrapper } from '@root/components'
import { NextSeo } from 'next-seo'
import { Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdGpsFixed } from 'react-icons/md'
import { useToggler } from 'molohooks'
import { useQuery } from 'react-query'
import { getLocation as fetchLocation, getMapUrl } from '@root/api/methods'
import { AnimatePresence, motion } from 'framer-motion'
import { FaGoogle, FaMapMarkedAlt } from 'react-icons/fa'

type apiData = {
  id: string
  geometry: {
    coordinates: number[]
    type: 'Point'
  }
  properties: {
    dist: number
    kinds: string
    name: string
    osm: string
    rate: number
    xid: string
  }
}

export default function NearYou() {
  const [location, setLocation] = useState<GeolocationPosition>()
  const toast = useToast()
  const [permission, setPermission] = useState<PermissionState>()

  const { isLoading, isError, isIdle, data: locations } = useQuery(
    [location?.coords.latitude, location?.coords.longitude],
    fetchLocation,
    {
      enabled: location,
    }
  )
  async function getPermission() {
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({
        name: 'geolocation',
      })

      setPermission(permission.state)
    }
  }

  useEffect(() => {
    getPermission()
  }, [])

  async function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => setLocation(pos))
    } else {
      toast({
        title: "Your browser doesn't support the Geolocation API",
        isClosable: true,
        description: 'Try upgrading your browser',
        status: 'error',
      })
    }
  }

  return (
    <>
      <NextSeo title='Near You' />

      <Layout>
        <Container maxWidth='full' paddingY={4}>
          {permission === 'denied' ? (
            <Container maxWidth={['100%', , '80%']}>
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Location Permission Blocked!</AlertTitle>
              </Alert>
            </Container>
          ) : (
            <>
              {!locations ? (
                <Center width='full' paddingBottom={4}>
                  <Button
                    colorScheme='blue'
                    leftIcon={<MdGpsFixed />}
                    onClick={getLocation}
                    isLoading={isLoading}
                  >
                    Get Current Location
                  </Button>
                </Center>
              ) : (
                <SimpleGrid columns={[1, , 2]} spacing={4}>
                  {((locations.data.features as apiData[]) || []).map(
                    ({
                      id,
                      properties: { dist, kinds, name },
                      geometry: { coordinates },
                    }) => {
                      const cleanedKinds = kinds.split(',').map(kind =>
                        kind
                          .split('_')
                          .map(
                            word => `${word[0].toUpperCase()}${word.slice(1)}`
                          )
                          .join(' ')
                      )

                      return (
                        <Box
                          key={id}
                          shadow='xl'
                          backgroundColor='blue.700'
                          color='white'
                          padding={4}
                          rounded={8}
                        >
                          <VStack>
                            <Heading size='lg'>{name}</Heading>
                            <LinkWrapper
                              nextProps={{
                                href: getMapUrl(name),
                              }}
                            >
                              <Button
                                colorScheme='blue'
                                rightIcon={<FaMapMarkedAlt />}
                              >
                                Open in Maps
                              </Button>
                            </LinkWrapper>
                            <Text>
                              Distance: {Math.round(dist).toString()}m
                            </Text>
                            <Wrap>
                              {cleanedKinds.map(kind => (
                                <WrapItem>
                                  <Tag key={kind}>{kind}</Tag>
                                </WrapItem>
                              ))}
                            </Wrap>
                          </VStack>
                        </Box>
                      )
                    }
                  )}
                </SimpleGrid>
              )}
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
