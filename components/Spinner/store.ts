import create from 'zustand'

export type Status = 'idle' | 'loading' | 'success' | 'error'

type LoadingState = {
  status: Status
  setStatus: (status: Status) => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
  status: 'idle',
  setStatus: (status: Status) =>
    set(() => ({
      status: status,
    })),
}))
