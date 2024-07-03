'use client'
import Image from "next/image"
import Link from "next/link"
import { ToggleThemeButton } from "./ToggleThemebutton"
import { useThemeStore } from "@/store/useThemeStore"

export const Header = ({ icon }) => {
    const { theme } = useThemeStore();

    return (
        <header className={`notion-header ${theme === 'dark' ? 'dark-mode' : ''}`}>
            <div className='notion-nav-header'>
                <div className='breadcrumbs'>
                    <Link href={'/'} className="bradscrumb">
                        <div className="notion-page-icon-inline notion-page-icon-image">
                            <span>
                                <Image width={22} height={22} src={icon} alt="Ha0peno" loading="lazy" decoding="async" />
                            </span>
                        </div>
                        <span className="title">Ha0peno</span>
                    </Link>
                    <ToggleThemeButton />
                </div>
            </div>
        </header>
    )
}