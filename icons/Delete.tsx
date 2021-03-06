import { Styleable } from '@lib/types'

export const DeleteIcon = ({ className }: Styleable) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        d="M16.563 2.5h-3.437v-.626C13.126.841 12.286 0 11.25 0h-2.5C7.715 0 6.875.84 6.875 1.876V2.5H3.437c-.862 0-1.562.7-1.562 1.563v1.25c0 .344.28.624.625.624h15a.626.626 0 0 0 .626-.624v-1.25c0-.863-.7-1.563-1.563-1.563Zm-8.437-.626c0-.343.28-.624.624-.624h2.5c.345 0 .626.28.626.626V2.5H8.125v-.626ZM3.062 7.187a.196.196 0 0 0-.196.204l.516 10.823A1.871 1.871 0 0 0 5.253 20h9.493a1.872 1.872 0 0 0 1.871-1.786l.517-10.823a.193.193 0 0 0-.054-.144.196.196 0 0 0-.141-.06H3.062ZM12.5 8.75a.625.625 0 0 1 1.25 0v8.126a.625.625 0 1 1-1.25 0V8.75Zm-3.125 0a.625.625 0 0 1 1.25 0v8.126a.625.625 0 1 1-1.25 0V8.75Zm-3.125 0a.625.625 0 1 1 1.25 0v8.126a.625.625 0 0 1-1.25 0V8.75Z"
        fill="#333"
      />
    </svg>
  )
}
