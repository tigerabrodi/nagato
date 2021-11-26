import { Styleable } from '@lib/types'

type Props = {
  id?: string
} & Styleable

export const MusicalNoteIcon = ({ className, id }: Props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className={className}
  >
    <g clipPath={`url(#${id})`}>
      <path
        d="M80.5 9.4c-22.5 5-41.6 9.5-42.3 9.9-.9.6-1.2 9.4-1.2 38.3 0 20.6-.2 37.4-.4 37.4s-2.1-.7-4.2-1.6c-2.2-.9-6.6-1.6-10-1.6-19.1-.1-29.1 17.7-16.7 29.7 9.8 9.5 27.9 8.1 36.7-2.8l3.1-3.9.3-30.3c.3-27.6.5-30.4 2-30.9 2.5-.8 69.5-15.6 70.4-15.6.4 0 .8 8.8.8 19.5v19.6l-2.8-1.5c-12.1-6.2-29.7.3-33.3 12.2-3.7 12.4 11.9 24.6 27.2 21.3 8.5-1.9 14.5-6.3 16.8-12.4.7-1.9 1.1-18.6 1.1-48.2 0-39.9-.2-45.5-1.6-46.9-.8-.9-2.3-1.6-3.2-1.5-.9 0-20.1 4.2-42.7 9.3Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id={id}>
        <path fill="#fff" d="M0 0h128v128H0z" />
      </clipPath>
    </defs>
  </svg>
)
