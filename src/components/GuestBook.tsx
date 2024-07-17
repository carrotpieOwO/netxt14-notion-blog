'use client'

import { Dialog } from 'primereact/dialog';
import {useModalStore} from '../store/useModalStore'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs';
import axios from 'axios';
import { useThemeStore } from '@/store/useThemeStore';
import { signOut, useSession } from 'next-auth/react';

import 'dayjs/locale/ko'; // 한국어 로케일
dayjs.locale('ko');

const createPost =  (data: Record<string, string>) => {
    return axios.post('/api/comment', data)
};
const getList = () => {
    return axios.get('/api/comment')
}
export default function GuestBook () {
    const { open, setOpen } = useModalStore()
    const [ value, setValue ] = useState('')
    const [ name, setName] = useState('')
    const [ list, setList ] = useState()
    const { theme } = useThemeStore();
    const { data: session } = useSession();

    async function fetchData() {
        const response = await getList();
        setList(response.data)
    }

    useEffect(() => {   
        open && fetchData();
    }, [open])

    const handleSubmit = async () => {    
        const formData = {
            name: name,
            message: value,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }

        await createPost(formData)
        setValue('')
        setName('')
        fetchData()
    }

    const Header =  useMemo(() => {
        return (
            <div style={{ display: 'flex', gap: '.5rem'}}>
                <button className='header-button red' onClick={()=>setOpen(false)} />
                <button className='header-button yellow'  />
                <button className='header-button green' />
            </div>
        )
    }, [])
    
    const goToLogin = () => {
        window.open('/login', 'window_name', 'width=430, height=500, location=no, status=no, scrollbars=yes')
    }

    const Footer = (
            <>
                { !session ?  <button onClick={goToLogin}>로그인</button>
                : <button onClick={() => signOut()}>로그아웃</button>    
            }
                <input value={name as string} onChange={(e)=>setName(e.target.value)} />
                <input value={value as string} onChange={(e)=>setValue(e.target.value)} />
                <button onClick={handleSubmit}>전송</button>
            </>
        );

    return (
        <Dialog 
            className={ `${theme === 'dark' && 'dark-mode'}` }
            footer={Footer} 
            // icons={myIcon} 
            header={Header}
            visible={open} 
            //style={{width: '20vw'}} 
            modal={false}
            closable={false}
            // onHide={setOpen}
            breakpoints={{'960px': '75vw', '640px': '100vw'}}
        >

            {
                list &&
                Object.keys(list).map(date => (
                    <div key={date} className='dateGroup'>
                        <span className='date'>{dayjs(date).format('YYYY년 MM월 DD일 (dd)')}</span>
                        {list[date].map(message => (
                            <div key={message._id} className='messageBox'>
                                <div className=''>
                                    <span className='name'>{message.name}</span>
                                </div>
                                <div className='messageContent imessage'>
                                    <p className='from-them'>{message.message}</p>
                                    <span className='time'>{dayjs(message.createdAt).format('A hh:mm')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            }
        </Dialog>
        
    )
}