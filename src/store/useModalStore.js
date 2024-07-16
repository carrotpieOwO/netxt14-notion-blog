'use client'
import { create } from 'zustand'

export const useModalStore = create((set) => {
    return {
        open: false,
        setOpen: (bool) => 
            set(() => ({
                open: bool
            })),
        toggleOpen: () => 
            set(({ open }) => ({
                open: !open
            })),
    };
});