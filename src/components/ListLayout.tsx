'use client'
import { useParams } from "next/navigation"
import { Cover } from "./Cover"
import { Social } from "./Social"
import { TagList } from "./TagList"
import { useEffect, useState } from "react"
import { Search } from "./Search"


export const ListLayout = ({ coverImages, children }) => {
    const [category, setCategory] = useState('')
    const param = useParams()
    
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
        <>
            {
                (isEmpty || hasTagKey || hasSearchKey) ?
                <div style={{ display: 'flex', flexDirection: 'column'}}>
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
        </>      
    )
}