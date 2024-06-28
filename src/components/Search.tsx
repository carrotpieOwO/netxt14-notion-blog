'use client'
import useDebounce from "@/hooks/useDebounce";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const Search = () => {
    
    const router = useRouter();

    const handleKeyUp = (e) => {
        
        if(e.key === 'Enter') {
            console.log('key up e', e.key, e.target.value)
            return router.push(`/search/${e.target.value}`)
        }
        //e.key === 'Enter' && router.push(`/search/${e.target.value}`)
    }
  
    return (
        <div className="notion-search-input">
            <input type="text" onKeyUp={handleKeyUp} />
            <FaSearch style={{ position: 'absolute'}} />
        </div>
    )
}