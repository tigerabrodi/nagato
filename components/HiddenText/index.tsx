import { SROnlyStyles } from '@theme/shared'
import { styled } from 'stitches.config'

const Text = styled('span', {
  ...SROnlyStyles,
})

type Props = {
  children: string
}

export const HiddenText = ({ children }: Props) => <Text>{children}</Text>
