'use client'
import { IoMoonSharp } from "@react-icons/all-files/io5/IoMoonSharp"
import { IoSunnyOutline } from "@react-icons/all-files/io5/IoSunnyOutline"
import { useCallback, useEffect, useState } from "react"
import cs from 'classnames'
import styles from './styles.module.css'
import { useThemeStore } from "@/store/useThemeStore"

export const ToggleThemeButton = () => {
    const [hasMounted, setHasMounted] = useState(false)
    const { theme, toggleTheme } = useThemeStore();
  
    useEffect(() => {
      window.localStorage.setItem('theme', theme)
      document.body.dataset.theme = theme

      const isComment = document.querySelector('iframe.utterances-frame');
      if (isComment) {
          const utterancesTheme = theme === 'light' ? "github-light" : "photon-dark" ;
          const utterancesEl = document.querySelector('iframe.utterances-frame') as HTMLIFrameElement;

          (
              utterancesEl?.contentWindow?.postMessage(
              { type: "set-theme", theme: utterancesTheme },
              "https://utteranc.es/"
          )
          )
      }
      
    }, [theme])
  

    useEffect(() => {
      setHasMounted(true)
    }, [])
  
    const handleToggle = useCallback(() => {
        toggleTheme()
    }, [toggleTheme])

    return (
      <button
        className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
        onClick={handleToggle}
      >
        {hasMounted && theme === 'dark' ? <IoMoonSharp /> : <IoSunnyOutline />}
      </button>
    )
}