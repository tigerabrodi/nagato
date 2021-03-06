import { Styleable } from '@lib/types'
import { keyframes } from '@stitches/react'
import { styled } from 'stitches.config'

const spin = keyframes({
  '0%': {
    transform: 'rotate(0turn)',
  },
  '100%': {
    transform: 'rotate(1turn)',
  },
})

const Wrapper = styled('div', {
  position: 'absolute',
  top: 78,
  right: 16,
  heightWidth: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
  backgroundColor: '$primary',
  boxShadow: '$shadowElevationLow',
  '@tablet': {
    heightWidth: 60,
    top: 125,
    right: 25,
  },
})

const Svg = styled('svg', {
  heightWidth: 30,
  '@tablet': {
    heightWidth: 50,
  },
  '@noReducedMotion': {
    animation: `${spin} 0.5s linear infinite`,
  },
})

export const SpinnerSVG = ({
  className,
  ariaLabel,
}: Styleable & { ariaLabel?: 'loading' }) => (
  <Svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 35 35"
    className={className}
    aria-label={ariaLabel}
    role={ariaLabel ? 'alert' : undefined}
  >
    <path
      d="M16.406 1.094c-.465.465-.547.902-.547 3.281s.082 2.816.547 3.281c.301.301.793.547 1.094.547.3 0 .793-.246 1.094-.547.465-.465.547-.902.547-3.281s-.082-2.816-.547-3.281C18.293.793 17.8.547 17.5.547c-.3 0-.793.246-1.094.547ZM27.754 5.195c-.793.328-4.238 3.965-4.238 4.485 0 .601 1.203 1.804 1.804 1.804.575 0 4.375-3.773 4.621-4.566.11-.438-.027-.82-.52-1.313-.737-.738-.847-.765-1.667-.41ZM1.094 16.406c-.301.301-.547.793-.547 1.094 0 .3.246.793.547 1.094.465.465.902.547 3.281.547s2.816-.082 3.281-.547c.684-.684.684-1.504 0-2.188-.465-.465-.902-.547-3.281-.547s-2.816.082-3.281.547ZM27.344 16.406c-.301.301-.547.793-.547 1.094 0 .3.246.793.547 1.094.465.465.902.547 3.281.547s2.816-.082 3.281-.547c.301-.301.547-.793.547-1.094 0-.3-.246-.793-.547-1.094-.465-.465-.902-.547-3.281-.547s-2.816.082-3.281.547ZM7.247 25.485c-1.121 1.093-2.078 2.27-2.188 2.597-.246.875.985 2.106 1.86 1.86.793-.246 4.566-4.047 4.566-4.621 0-.247-.3-.766-.684-1.122-.355-.382-.875-.683-1.12-.683-.247 0-1.34.902-2.434 1.969ZM24.2 24.2c-.384.355-.684.874-.684 1.12 0 .246.902 1.367 1.996 2.516 1.586 1.586 2.187 2.023 2.789 2.023.984 0 1.86-.984 1.613-1.804-.219-.793-4.02-4.54-4.594-4.54-.246 0-.765.301-1.12.684ZM16.406 27.344c-.465.465-.547.902-.547 3.281s.082 2.816.547 3.281c.301.301.793.547 1.094.547.3 0 .793-.246 1.094-.547.465-.465.547-.902.547-3.281s-.082-2.816-.547-3.281c-.301-.301-.793-.547-1.094-.547-.3 0-.793.246-1.094.547Z"
      fill="#FF0073"
    />
  </Svg>
)

export const Spinner = () => {
  return (
    <Wrapper aria-label="loading" role="alert">
      <SpinnerSVG />
    </Wrapper>
  )
}
