'use client'
import { api } from "@/lib/config"
import Link from "next/link"
import { useEffect, useState } from "react"

async function getTagList() {
    const res = await fetch(api.getTagList)
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export const TagList = () => {
    const allTags = [{ id: 0, name: 'all', color: 'basic' }]
    const [ tagList, setTagList ] = useState(allTags);
    
    useEffect(() => {
        async function fetchData() {
            const response = await getTagList();
            setTagList([...allTags, ...response])
        }
        fetchData();
    }, []);

  return (
    <div className='notion-collection-card-property' style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <span className='notion-property notion-property-multi_select'>
        {
            tagList.map(tag => 
                <Link key={tag.id} href={tag.name === 'all' ? '/' : `/tag/${tag.name}`} className={`notion-property-multi_select-item notion-item-${tag.color}`} style={{ cursor: 'pointer' }}>
                    { tag.name }
                </Link>
            )
        }
        </span>
    </div>
  )
}