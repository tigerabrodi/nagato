import Link from 'next/link'
import { toRem } from '@lib/helpers'
import { styled } from 'stitches.config'
import { ExternalIcon } from '@icons/External'

const FooterWrapper = styled('footer', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 70,
  borderTop: '3px solid $secondary',
  backgroundColor: '$primary',
  boxShadow: '0 -1px 3px black',
  '@tablet': {
    height: 90,
  },
})

const FooterText = styled('p', {
  color: '$tertiary',
  fontWeight: '$medium',
  fontSize: toRem(16),
  '@tablet': {
    fontSize: toRem(25),
  },
})

const FooterLink = styled('a', {
  textDecoration: 'underline',
  color: 'inherit',
  position: 'relative',
})

const External = styled(ExternalIcon, {
  top: 0,
  right: 0,
  transform: 'translate(100%, -100%)',
  position: 'absolute',
  height: 15,
  width: 15,
  fill: '$tertiary',
  '@tablet': {
    height: 20,
    width: 20,
  },
})

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterText>
        Built by{' '}
        <Link passHref href="https://twitter.com/tabrodi">
          <FooterLink target="_blank" rel="noopener noreferrer">
            Tiger Abrodi
            <External />
          </FooterLink>
        </Link>
      </FooterText>
    </FooterWrapper>
  )
}
