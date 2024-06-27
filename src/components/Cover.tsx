'use client'

import Image from "next/image"
import { usePathname } from "next/navigation"

export const Cover = ({coverImage}) => {
    const pathname = usePathname();
    
    return (
        <>
            {
                pathname === '/' &&
                <>
                    <div className="notion-page-cover-wrapper">
                        <span style={{ position: 'relative' }}>
                            <Image src={coverImage.coverImage} fill alt="main cover" />
                        </span>
                        <h1 style={{ position: 'absolute'}}>ha0peno</h1>
                    </div>
                    <div className="notion-page-has-cover">
                        <div style={{ position: 'relative' }} className="notion-page-icon-hero notion-page-icon-image">
                            <Image src={coverImage.heroImage} width={124} height={124} alt="main icon" />
                        </div>
                    </div>
                </>
            }
        </>
    )
}