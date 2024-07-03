import { create } from 'zustand'

export const useThemeStore = create((set) => {
    return {
        theme:  localStorage.getItem('theme')
            || (
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? 'dark'
                : 'light'
            ),
        toggleTheme: () =>
            set(({ theme }) => ({
                theme: theme === 'dark' ? 'light' : 'dark'
            })),
    };
});
