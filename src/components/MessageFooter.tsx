'use client'

import axios from "axios";
import dayjs from "dayjs";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import { useThemeStore } from "@/store/useThemeStore";
import { LuSendHorizonal } from "react-icons/lu";

const postMessage =  (data: Record<string, string>) => {
    return axios.post('/api/comment', data)
};
export default function MessageFooter ({ sendCallback }: { sendCallback:() => void}) {
    const { data: session } = useSession();
    const [ value, setValue ] = useState('')
    const { theme } = useThemeStore();

    const goToLogin = () => {
        window.open('/login', 'window_name', 'width=430, height=500, location=no, status=no, scrollbars=yes')
    }
    
    const handleSubmit = async () => {    
        const formData = {
            name: session?.user?.name,
            message: value,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }

        await postMessage(formData)
        setValue('')
        sendCallback()
    }

    const handleSignOut = () => {
        confirmDialog({
            message: '로그아웃 하시겠습니까?',
            header: null,
            accept: () => signOut({ redirect: false }),
            acceptLabel: '확인',
            rejectLabel: '취소',
        });
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', gap: '.5rem' }}>
            { !session 
                ? <button onClick={goToLogin}>
                    <FaGoogle />                    
                </button>
                : 
                <button onClick={handleSignOut}>
                    {
                        session?.user?.image &&
                        <Image src={session?.user?.image} alt={session?.user?.name ?? 'user-image'} width={20} height={20} style={{ borderRadius: '50%' }} />
                    }                    
                </button>    
            }
            <ConfirmDialog className={`${theme === 'dark' && 'dark-mode'}`} />
            <input value={value as string} onChange={(e)=>setValue(e.target.value)} placeholder={ session ? '메시지를 남겨주세요.' : '로그인 후 메시지를 남겨주세요.'} disabled={!session} />
            <button onClick={handleSubmit}><LuSendHorizonal /></button>
        </div>
    )
}