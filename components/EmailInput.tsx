import { Input, InputProps } from '@chakra-ui/react'
import { memo } from 'react'

const EmailInput = (props: InputProps) => (
  <Input
    placeholder='E-Mail'
    variant='flushed'
    type='email'
    isRequired
    {...props}
  />
)

export default memo(EmailInput)
