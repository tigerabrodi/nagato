import { createStitches } from '@stitches/react'

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      primary: '#333333',
      secondary: '#FF0073',
      tertiary: '#FFFFFF',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    fontSizes: {
      mobileHeading: `${40 / 16}rem`,
      desktopHeading: `${80 / 16}rem`,
    },
    fonts: {
      Inter: '"Inter", sans-serif',
    },
  },
  media: {
    tablet: `(min-width: ${550 / 16}rem)`,
    laptop: `(min-width: ${1100 / 16}rem)`,
    desktop: `(min-width: ${1500 / 16}rem)`,
  },
})
