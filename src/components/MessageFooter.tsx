'use client'

import axios from "axios";
import dayjs from "dayjs";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const postMessage =  (data: Record<string, string>) => {
    return axios.post('/api/comment', data)
};
export default function MessageFooter ({ sendCallback }: { sendCallback:() => void}) {
    const { data: session } = useSession();
    const [ value, setValue ] = useState('')
    const [ name, setName] = useState('')

    const goToLogin = () => {
        window.open('/login', 'window_name', 'width=430, height=500, location=no, status=no, scrollbars=yes')
    }
    
    const handleSubmit = async () => {    
        const formData = {
            name: name,
            message: value,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }

        await postMessage(formData)
        setValue('')
        setName('')
        sendCallback()
    }

    return (
        <>
            { !session 
                ?  <button onClick={goToLogin}>로그인</button>
                : <button onClick={() => signOut()}>로그아웃</button>    
            }
            <input value={name as string} onChange={(e)=>setName(e.target.value)} />
            <input value={value as string} onChange={(e)=>setValue(e.target.value)} />
            <button onClick={handleSubmit}>전송</button>
        </>
    )
}