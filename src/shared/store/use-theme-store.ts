import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
    theme: 'light' | 'dark'
}

type Actions = {
    toggleTheme: (theme: 'light' | 'dark') => void
}

const initialState: State = {
    theme: 'dark',
}

export const useThemeStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...initialState,
            toggleTheme: (theme) => set(() => ({ theme: theme === 'light' ? 'dark' : 'light' })),
        }),
        { name: 'theme-storage' },
    ),
)
