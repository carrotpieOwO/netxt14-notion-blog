'use client'

import { Dialog } from 'primereact/dialog';
import {useModalStore} from '../store/useModalStore'
import { useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs';
import { useThemeStore } from '@/store/useThemeStore';

import 'dayjs/locale/ko'; // 한국어 로케일
import useGuestbook from '@/hooks/useGuestbook';
import MessageFooter from './MessageFooter';
import axios from 'axios';
dayjs.locale('ko');

const getList = () => {
    return axios.get('/api/comment')
}
export default function GuestBook () {
    const { open, setOpen } = useModalStore()
    const { theme } = useThemeStore();
    const bottomRef = useRef();
    const [ list, setList ] = useState()
    
    async function getMessages() {
        const response = await getList();
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
            <div ref={bottomRef} />
        </Dialog>
        
    )
}