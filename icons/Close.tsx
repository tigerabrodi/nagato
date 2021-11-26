import { Styleable } from '@lib/types'

export const CloseIcon = ({ className }: Styleable) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      className={className}
    >
      <path
        d="m18 15.141-6.236-6.157 6.15-6.211L15.14 0 8.982 6.239 2.75.086 0 2.836l6.24 6.18L.087 15.25 2.836 18l6.178-6.239 6.213 6.153L18 15.14v.001Z"
        fill="#333"
      />
    </svg>
  )
}
