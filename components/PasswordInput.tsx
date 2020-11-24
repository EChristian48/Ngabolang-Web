import { Input, InputProps } from '@chakra-ui/react'
import { memo } from 'react'

const PasswordInput = (props: InputProps) => (
  <Input
    placeholder='Password'
    variant='flushed'
    type='password'
    isRequired
    {...props}
  />
)

export default memo(PasswordInput)
