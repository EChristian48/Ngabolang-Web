import {
  Box,
  Button,
  Heading,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { getMapUrl } from '@root/api/methods'
import { FC } from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { LinkWrapper } from '.'

export type LocationCardProps = {
  distance: number
  kinds: string
  name: string
}

const LocationCard: FC<LocationCardProps> = ({ distance, kinds, name }) => {
  const cleanedKinds = kinds.split(',').map(kind =>
    kind
      .split('_')
      .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(' ')
  )

  return (
    <Box
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
            href: getMapUrl(name as string),
          }}
        >
          <Button colorScheme='blue' rightIcon={<FaMapMarkedAlt />}>
            Open in Maps
          </Button>
        </LinkWrapper>
        <Text>Distance: {Math.round(distance).toString()}m</Text>
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

export default LocationCard
