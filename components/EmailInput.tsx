import { Input, InputProps } from '@chakra-ui/core'

const EmailInput = (props: InputProps) => (
  <Input
    placeholder='E-Mail'
    variant='flushed'
    type='email'
    isRequired
    {...props}
  />
)

export default EmailInput
