'use client'
import { useParams } from "next/navigation"
import { Cover } from "./Cover"
import { Social } from "./Social"
import { TagList } from "./TagList"
import { ReactNode, useEffect, useState } from "react"
import { Search } from "./Search"
import { useThemeStore } from "@/store/useThemeStore"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { SessionProvider } from "next-auth/react"

export const ListLayout = ({ coverImages, children } : { coverImages: { coverImage: string | StaticImport, heroImage: string | StaticImport }, children: ReactNode }) => {
    const [category, setCategory] = useState('')
    const { theme } = useThemeStore()
//    const param = useParams<RouteParams>()
    const param = useParams<any>();

    
    const isEmpty = Object.keys(param).length === 0;
    const hasTagKey = param.hasOwnProperty('tagName');
    const hasSearchKey = param.hasOwnProperty('query');

    useEffect(() => {
        const hasTagKey = param.hasOwnProperty('tagName');
        const hasSearch = param.hasOwnProperty('query');
        const category = hasTagKey ? param.tagName.toUpperCase() : hasSearch ? decodeURIComponent(param.query) : 'ALL';
        setCategory(category)
        
    }, [param])

    return (
        <SessionProvider>
            {
                (isEmpty || hasTagKey || hasSearchKey) ?
                <div style={{ display: 'flex', flexDirection: 'column'}} className={ theme === 'dark' ? 'dark-mode' : ''}>
                    <div className="notion-page-scroller">
                        <Cover coverImage={coverImages} />
                        <main className="notion-page notion-page-has-cover notion-page-has-icon notion-page-has-image-icon notion-full-page index-page">
                            <TagList />
                            <div className="notion-category">
                                <h4>{ category }</h4>
                                <Search />
                            </div>
                            <div className="notion-page-content notion-page-content-has-aside">
                                { children }
                                <Social />
                            </div>
                        </main>
                    </div>
                </div>
                :
                children
            }
        </SessionProvider>
    )
}