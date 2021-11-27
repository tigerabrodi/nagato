import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { CSS } from '@stitches/react'
import { styled } from 'stitches.config'

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, .5)',
})

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode
}

export const Dialog = ({ children, ...props }: DialogProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  )
}

const StyledContent = styled(DialogPrimitive.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  marginTop: '-5vh',
  backgroundColor: '$secondary',
  '&:focus': {
    outline: 'none',
  },
})

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>
type DialogContentProps = DialogContentPrimitiveProps & { css?: CSS }

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
  </StyledContent>
))

DialogContent.displayName = 'DialogContent'

export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
