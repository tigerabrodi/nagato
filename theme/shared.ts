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
  outlineOffset: '2px',
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
