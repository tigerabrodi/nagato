import { build, fake } from '@jackfranklin/test-data-bot'

type User = {
  email: string
  password: string
  fullname: string
  tasteOfMusic: string
}

type Room = {
  title: string
  typeOfMusic: string
}

export const buildUser = build<User>('User', {
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
    fullname: fake((f) => f.name.firstName()),
    tasteOfMusic: fake((f) => f.random.words(5)),
  },
})

export const buildRoom = build<Room>('Room', {
  fields: {
    title: fake((f) => f.name.title()),
    typeOfMusic: fake((f) => f.random.words(5)),
  },
})
