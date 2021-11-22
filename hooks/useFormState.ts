import * as React from 'react'

export const useFormState = <InitialState extends object>(
  initialState: InitialState
) => {
  const [formState, setFormState] = React.useState<InitialState>(initialState)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  return { formState, setFormState, handleChange }
}
