'use client'
import { usePathname } from "next/navigation"
import { Cover } from "./Cover"
import { Social } from "./Social"

export const ListLayout = ({ coverImages, children }) => {
    const pathname = usePathname();
    
    if(pathname !== '/' && !pathname?.includes('tag')) return children
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div className="notion-page-scroller">
                <Cover coverImage={coverImages} />
                <main className="notion-page notion-page-has-cover notion-page-has-icon notion-page-has-image-icon notion-full-page index-page">
                <div className="notion-page-content notion-page-content-has-aside">
                    { children }
                    <Social />
                </div>
                </main>
            </div>
        </div>
    )
}