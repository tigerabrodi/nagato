import { SROnlyStyles } from '@theme/shared'
import { styled } from 'stitches.config'

const Text = styled('span')

type Props = {
  id?: string
  children: string
}

export const HiddenText = ({ children, id }: Props) => (
  <Text id={id} css={{ ...SROnlyStyles }}>
    {children}
  </Text>
)
