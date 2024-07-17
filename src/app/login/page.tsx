'use client'
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Login() {
    const { data: session } = useSession();
    
    useEffect(() =>{ 
        if(!!session) {
            self.close()
        } else {
            signIn('google')
        }
        
    }, [session])

    return null
}