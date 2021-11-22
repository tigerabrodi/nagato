import { Styleable } from '@lib/types'

export const ExternalIcon = ({ className }: Styleable) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    className={className}
  >
    <g clip-path="url(#external)" fill="#FFFFF">
      <path d="M11.446.133H7.932a.554.554 0 1 0 0 1.109h2.175L4.792 6.558a.554.554 0 0 0 .784.784l5.316-5.316V4.2A.554.554 0 1 0 12 4.2V.687a.554.554 0 0 0-.554-.554Z"></path>
      <path d="M9.178 4.755a.554.554 0 0 0-.555.555v5.448H1.11V3.243h5.776a.554.554 0 1 0 0-1.108H.555A.554.554 0 0 0 0 2.689v8.624a.554.554 0 0 0 .554.554h8.624a.555.555 0 0 0 .554-.554V5.31a.554.554 0 0 0-.554-.555Z"></path>
    </g>
    <defs>
      <clipPath id="external">
        <path fill="#fff" d="M0 0h12v12H0z"></path>
      </clipPath>
    </defs>
  </svg>
)
