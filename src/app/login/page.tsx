'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
    const { data: session } = useSession();
    const [ isPopup, setIsPopup ] = useState<Boolean>();
    const router = useRouter();
    
    useEffect(() => {
        if(!window.opener) {
            setIsPopup(false)
        } else {
            setIsPopup(true)
        }
    }, [])

    useEffect(() =>{ 
        if(isPopup) {
            if(!!session) {
                self.close()
            } else {
                signIn('google')
            }
        } else {
            router.push('/')
        }
    }, [session, isPopup, router])

    return null
}