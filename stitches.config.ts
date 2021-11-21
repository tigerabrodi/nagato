import { createStitches } from '@stitches/react'

const SHADOW_COLOR = '285deg 6% 9%'

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
    shadows: {
      shadowElevationMedium: `0px 0.1px 0.1px hsl(${SHADOW_COLOR} / 0.09), 0px 0.7px 1px -0.2px hsl(${SHADOW_COLOR} / 0.26), 0px 1.5px 2.1px -0.3px hsl(${SHADOW_COLOR} / 0.44), 0px 3.3px 4.7px -0.5px hsl(${SHADOW_COLOR} / 0.61)`,
      shadowElevationLow: `0px 0.8px 1px hsl(${SHADOW_COLOR} / 0.29), 0px 1.6px 2.1px -0.7px hsl(${SHADOW_COLOR} / 0.44), 0px 3.9px 5px -1.4px hsl(${SHADOW_COLOR} / 0.6);`,
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
  utils: {
    marginX: (value: number) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: number) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: number) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: number) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
  media: {
    tablet: `(min-width: ${700 / 16}rem)`,
    laptop: `(min-width: ${1100 / 16}rem)`,
    desktop: `(min-width: ${1500 / 16}rem)`,
  },
})
