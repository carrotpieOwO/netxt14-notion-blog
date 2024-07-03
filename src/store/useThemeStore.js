'use client'
import { create } from 'zustand'

export const useThemeStore = create((set) => {
    if (typeof window === "undefined") {
        return {
            theme: 'system',
            setTheme: (theme) => 
                set(() => ({
                    theme: theme
                })),
            toggleTheme: () =>
                set(({ theme }) => ({
                    theme: theme === 'dark' ? 'light' : 'dark'
                })),
        };
    }
    return {
        theme: localStorage.getItem('theme')
            || (
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? 'dark'
                : 'light'
            ),
        setTheme: (theme) => 
            set(() => ({
                theme: theme
            })),
        toggleTheme: () =>
            set(({ theme }) => ({
                theme: theme === 'dark' ? 'light' : 'dark'
            })),
    };
});