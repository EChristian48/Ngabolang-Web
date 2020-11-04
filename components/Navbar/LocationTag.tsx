import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/core'
import { FC } from 'react'

export type LocationTag = {
  size: 'md' | 'lg'
  onClose: () => void
}

const LocationTag: FC<LocationTag> = ({ size, children, onClose }) => {
  return (
    <Tag size={size} rounded='full' variant='solid' variantColor='red' marginRight='2'>
      <TagLabel>{children}</TagLabel>
      <TagCloseButton onClick={onClose} />
    </Tag>
  )
}

export default LocationTag
