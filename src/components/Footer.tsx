'use client'
import { FaEnvelopeOpenText } from '@react-icons/all-files/fa/FaEnvelopeOpenText'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { FaMastodon } from '@react-icons/all-files/fa/FaMastodon'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube'
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram'
import { FaGamepad } from '@react-icons/all-files/fa/FaGamepad'
import { FaZhihu } from '@react-icons/all-files/fa/FaZhihu'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import * as config from '@/lib/config'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useModalStore } from '@/store/useModalStore'
import { TbMessageCircle2Filled } from 'react-icons/tb'
import { useThemeStore } from '@/store/useThemeStore'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import { usePathname } from 'next/navigation'

export const Footer = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const { setOpen } = useModalStore()
  const currentYear = new Date().getFullYear()
  const { theme, toggleTheme } = useThemeStore();
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if(pathname === '/login') {
    return null        
  }
  
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>Copyright {currentYear} {config.author}</div>

      <div className={styles.settings}>
        {hasMounted && (
          <a
            className={styles.toggleDarkMode}
            role='button'
            onClick={toggleTheme}
            title='Toggle dark mode'
          >
            {theme === 'dark' ? <IoMoonSharp /> : <IoSunnyOutline />}
          </a>
        )}
      </div>

      <div className={styles.social}>
        {config.twitter && (
          <a
            className={styles.twitter}
            href={`https://twitter.com/${config.twitter}`}
            title={`Twitter @${config.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter />
          </a>
        )}

        {config.mastodon && (
          <a
            className={styles.mastodon}
            href={config.mastodon}
            title={`Mastodon ${config.getMastodonHandle()}`}
            rel='me'
          >
            <FaMastodon />
          </a>
        )}

        {config.zhihu && (
          <a
            className={styles.zhihu}
            href={`https://zhihu.com/people/${config.zhihu}`}
            title={`Zhihu @${config.zhihu}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaZhihu />
          </a>
        )}

        {config.github && (
          <a
            className={styles.github}
            href={`https://github.com/${config.github}`}
            title={`GitHub @${config.github}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub />
          </a>
        )}

        {config.linkedin && (
          <a
            className={styles.linkedin}
            href={`https://www.linkedin.com/in/${config.linkedin}`}
            title={`LinkedIn ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedin />
          </a>
        )}

        {config.newsletter && (
          <a
            className={styles.newsletter}
            href={`${config.newsletter}`}
            title={`Newsletter ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaEnvelopeOpenText />
          </a>
        )}

        {config.youtube && (
          <a
            className={styles.youtube}
            href={`https://www.youtube.com/${config.youtube}`}
            title={`YouTube ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaYoutube />
          </a>
        )}
        {config.instagram && (
          <a
            className={styles.instagram}
            href={`https://www.instagram.com/${config.instagram}`}
            title={`instagram ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram />
          </a>
        )}
        {config.game && (
          <a
            className={styles.game}
            href={`${config.game}`}
            title={`game ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGamepad />
          </a>
        )}
        {config.guestBook && (
          <a
            className={styles.messages}
            role='button'
            onClick={() => setOpen(true) }
            title={`guest book ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <TbMessageCircle2Filled />
          </a>
        )}
      </div>
    </footer>
  )
}
