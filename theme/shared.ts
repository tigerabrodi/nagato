import { CSS, keyframes } from '@stitches/react'

export const SROnlyStyles: CSS = {
  position: 'absolute',
  left: -10000,
  top: 'auto',
  width: 1,
  height: 1,
  overflow: 'hidden',
}

export const focusStyles: CSS = {
  outline: '2px solid white',
  outlineOffset: 2,
  boxShadow: '0 0 0 6px black',
}

export const bump = keyframes({
  '60%': {
    transform: 'translateY(1px) scale(0.99)',
  },
  '100%': {
    transform: 'translateY(-1px) scale(1.01)',
  },
})

export const bumpingAnimation = `${bump} 0.4s infinite alternate ease-out`

export const commonButtonActiveStyles: CSS = {
  '&:active': {
    transition: 'all 0.1s ease-out',
    transform: 'translateY(0) scale(0.99)',
    boxShadow: '0 1px 3px black',
  },
}

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const fadeInAnimation = `${fadeIn} 0.75s ease-out both`

export const DefaultAvatar2x = '/DefaultAvatar2x.jpg'
export const DefaultAvatar3x = '/DefaultAvatar3x.jpg'
export const DefaultAvatar4x = '/DefaultAvatar4x.jpg'

export const willChangeTransformStyles = { 'will-change': 'transform' }
