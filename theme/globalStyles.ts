import { globalCss } from 'stitches.config'

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
  },
  img: {
    display: 'block',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  'a, button': {
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    backgroundColor: 'transparent',
  },
  'input:focus, textarea:focus': {
    outline: 'none',
  },
  'input::placeholder, textarea::placeholder': {
    opacity: 0.7,
    color: 'inherit',
  },
  textarea: {
    border: 'none',
  },
  '#__next': {
    isolation: 'isolate',
    width: '100%',
    minHeight: '100%',
  },
  main: {
    minHeight: 'calc(100vh - 130px)',
    width: '100%',
    '@tablet': {
      minHeight: 'calc(100vh - 190px)',
    },
  },
})
