'use client'

import { Dialog } from 'primereact/dialog';
import {useModalStore} from '../store/useModalStore'
import { useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs';
import { useThemeStore } from '@/store/useThemeStore';
import 'dayjs/locale/ko'; // 한국어 로케일
import MessageFooter from './MessageFooter';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import MessageBox from './MessageBox';
dayjs.locale('ko');

const getList = () => {
    return axios.get('/api/comment')
}
const deleteOne = (id) => {
    return axios.delete(`/api/comment?id=${id}`)
}

export default function GuestBook () {
    const { open, setOpen } = useModalStore()
    const { theme } = useThemeStore();
    const bottomRef = useRef();
    const [ list, setList ] = useState()
    
    async function getMessages() {
        const response = await getList();
        console.log('res', response)
        setList(response.data)
    }

    useEffect(() => {   
        open && getMessages();
    }, [open])

    const Header =  useMemo(() => {
        return (
            <div style={{ display: 'flex', gap: '.5rem'}}>
                <button className='header-button red' onClick={()=>setOpen(false)} />
                <button className='header-button yellow'  />
                <button className='header-button green' />
            </div>
        )
    }, [])

    const sendCallback = () => {
        getMessages()
    }
    
    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView();
        }
    };

    useEffect(() => {
        scrollToBottom()
    }, [list])
    
    const deleteMessage = async(id:string) => {
        const res = await deleteOne(id)
        if(res.status === 200) {
            getMessages()
        }
    }

    return (
        <Dialog 
            className={ `${theme === 'dark' && 'dark-mode'}` }
            footer={<MessageFooter sendCallback={sendCallback} />} 
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
                            <MessageBox key={message._id} message={message} deleteMessage={deleteMessage} />
                        ))}
                    </div>
                ))
            }
            <div ref={bottomRef} />
        </Dialog>
    )
}