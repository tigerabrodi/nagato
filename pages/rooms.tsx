import * as React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@components/Dialog'
import { useHasMounted } from 'hooks/useHasMounted'
import { styled } from 'stitches.config'
import { CloseIcon } from '@icons/Close'
import { RoomPartyIcon } from '@icons/RoomParty'

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

const RoomsHeading = styled('h1', {
  marginTop: 20,
  fontSize: '$mobileHeading',
  fontWeight: 'bold',
  color: '$tertiary',
})

const CloseButton = styled('button', {
  position: 'absolute',
  top: 15,
  right: 15,
  heightWidth: 18,
  svg: {
    heightWidth: '100%',
    path: {
      fill: '$primary',
    },
  },
})

const DialogTriggerButton = styled(DialogTrigger, {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
  width: 110,
  height: 35,
  fontWeight: '$semiBold',
  fontSize: 16,
  backgroundColor: '$tertiary',
  color: '$primary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  transform: 'translateY(-10px)',
  boxShadow: '$shadowElevationLow',
  zIndex: 10,
})

const IconWrapper = styled('div', {
  heightWidth: 24,
  backgroundColor: '$primary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const RoomParty = styled(RoomPartyIcon, {
  heightWidth: 18,
  path: {
    fill: '$tertiary',
  },
})

export const Rooms = () => {
  const dialogRef =
    React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>
  const hasMounted = useHasMounted()

  if (!hasMounted) return null

  return (
    <Main>
      <RoomsHeading>Rooms</RoomsHeading>
      <Dialog>
        <DialogContent ref={dialogRef}>
          <DialogTitle asChild>Hello World</DialogTitle>
          <DialogClose asChild>
            <CloseButton>
              <CloseIcon />
            </CloseButton>
          </DialogClose>
        </DialogContent>
        <DialogTriggerButton>
          Create
          <IconWrapper>
            <RoomParty />
          </IconWrapper>
        </DialogTriggerButton>
      </Dialog>
    </Main>
  )
}

export default Rooms
