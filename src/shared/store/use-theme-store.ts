import { create } from 'zustand'

type State = {
    theme: 'light' | 'dark'
}

type Actions = {
    toggleTheme: (theme: 'light' | 'dark') => void
}

const initialState: State = {
    theme: 'dark',
}

export const useThemeStore = create<State & Actions>((set) => ({
    ...initialState,
    toggleTheme: (theme) => set(() => ({ theme: theme === 'light' ? 'dark' : 'light' })),
}))
