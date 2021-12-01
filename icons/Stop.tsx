import { Styleable } from '@lib/types'

export const StopIcon = ({ className }: Styleable) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 51"
      className={className}
    >
      <path fill="#333" d="M0 0h50v51H0z" />
    </svg>
  )
}
