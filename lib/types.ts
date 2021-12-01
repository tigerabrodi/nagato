export type Styleable = {
  className?: string
}

export type User = {
  id: string
  userId: string
  fullname: string
  roomId: string
  tasteOfMusic: string
  avatarUrl: string
  email: string
}

export type Room = {
  id: string
  title: string
  typeOfMusic: string
  owner: string
  currentTrack?: {
    duration: number
    url: string
    startedAt: number
    name: string
  }
}
