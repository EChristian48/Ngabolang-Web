import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/core'
import useTags from '@root/hooks/useTags'
import { FC } from 'react'

export type LocationTag = {
  size: 'md' | 'lg'
}

const LocationTag: FC<LocationTag> = ({ size, children }) => {
  const { removeTag } = useTags()

  return (
    <Tag
      size={size}
      rounded='full'
      variant='solid'
      variantColor='red'
      marginRight='2'
    >
      <TagLabel>{children}</TagLabel>
      <TagCloseButton onClick={() => removeTag(children as string)} />
    </Tag>
  )
}

export default LocationTag
