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
  },
  '#__next': {
    isolation: 'isolate',
  },
})
