import { Input, InputProps } from '@chakra-ui/core'

const PasswordInput = (props: InputProps) => (
  <Input
    placeholder='Password'
    variant='flushed'
    type='password'
    isRequired
    {...props}
  />
)

export default PasswordInput
