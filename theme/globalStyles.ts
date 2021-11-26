import { globalCss } from 'stitches.config'
import { focusStyles } from './shared'

export const globalStyles = globalCss({
  '@import':
    "url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap')",
  'html, body': {
    backgroundColor: '$primary',
    fontFamily: '$Inter',
    height: '100%',
    margin: 0,
  },
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'a, button': {
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    backgroundColor: 'transparent',
  },
  'a:focus-visible, button:focus-visible': {
    transition: 'outline 0.1s, outline-offset 0.1s, box-shadow 0.1s',
    ...focusStyles,
  },
  'input:focus, textarea:focus': {
    outline: 'none',
    boxShadow: '$shadowMedium',
  },
  'input::placeholder, textarea::placeholder': {
    fontStyle: 'italic',
    color: 'inherit',
  },
  'textarea, input': {
    border: 'none',
    transition: 'box-shadow 0.1s',
  },
  '#__next': {
    isolation: 'isolate',
    width: '100%',
    minHeight: '100%',
  },
  main: {
    minHeight: 'calc(calc(var(--vh, 1vh) * 100) - 130px)',
    width: '100%',
    '@tablet': {
      minHeight: 'calc(calc(var(--vh, 1vh) * 100) - 190px)',
    },
  },
})
