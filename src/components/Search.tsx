import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import { useRouter } from "next/navigation";

export const Search = () => {
    
    const router = useRouter();

    const handleKeyUp = (e) => {
        
        if(e.key === 'Enter') {
            return router.push(`/search/${e.target.value}`)
        }
        if(e.key === 'Backspace' && e.target.value === '') {
            return router.push(`/`)
        }
    }
  
    return (
        <div className="notion-search-input">
            <input type="text" onKeyUp={handleKeyUp} />
            <FaSearch style={{ position: 'absolute'}} />
        </div>
    )
}