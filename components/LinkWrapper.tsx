import { Link, LinkProps } from '@chakra-ui/core'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { FC } from 'react'

export type LinkWrapperProps = {
  nextProps: NextLinkProps
  chakraProps?: LinkProps
}

const LinkWrapper: FC<LinkWrapperProps> = ({
  children,
  nextProps,
  chakraProps,
}) => (
  <NextLink {...nextProps} passHref>
    <Link {...chakraProps}>{children}</Link>
  </NextLink>
)

export default LinkWrapper
