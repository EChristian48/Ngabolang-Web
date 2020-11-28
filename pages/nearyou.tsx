import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Container,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import { getLocation as fetchLocation } from '@root/api/methods'
import { Layout } from '@root/components'
import LocationCard from '@root/components/LocationCard'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import { MdGpsFixed } from 'react-icons/md'
import { useQuery } from 'react-query'

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
          {permission !== 'denied' ? (
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
                  {(locations.data.features as apiData[]).map(
                    ({ id, properties: { dist, kinds, name } }) => (
                      <LocationCard
                        distance={dist}
                        kinds={kinds}
                        name={name}
                        key={id}
                      />
                    )
                  )}
                </SimpleGrid>
              )}
            </>
          ) : (
            <Container maxWidth={['100%', , '80%']}>
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Location Permission Blocked!</AlertTitle>
              </Alert>
            </Container>
          )}
        </Container>
      </Layout>
    </>
  )
}
