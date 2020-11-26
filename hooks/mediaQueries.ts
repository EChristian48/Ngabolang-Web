import { useMediaQuery } from '@chakra-ui/react'

export function useMediumScreen() {
  const [isMediumScreen] = useMediaQuery('(min-width: 48em)')
  return isMediumScreen
}
