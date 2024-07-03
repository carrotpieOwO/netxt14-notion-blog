import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import { useRouter } from "next/navigation";

export const Search = () => {
    
    const router = useRouter();

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if(e.key === 'Enter') {
            return router.push(`/search/${target.value}`)
        }
        if(e.key === 'Backspace' && target.value === '') {
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