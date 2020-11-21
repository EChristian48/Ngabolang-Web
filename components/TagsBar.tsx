import {
  Center,
  SlideFade,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import useTags from '@root/hooks/useTags'

export default function TagsBar() {
  const { tags, removeTag } = useTags()

  return (
    <Center position='fixed' bottom={4} width='full' zIndex={99}>
      <Wrap justify='center'>
        {tags.map(tag => (
          <WrapItem key={tag}>
            <SlideFade in offsetY={-20}>
              <Tag size='lg'>
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => removeTag(tag)} />
              </Tag>
            </SlideFade>
          </WrapItem>
        ))}
      </Wrap>
    </Center>
  )
}
