'use client'
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { confirmDialog } from "primereact/confirmdialog";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";


export default function MessageBox ({ message, deleteMessage }) {
    const { data: session } = useSession();
    const [ showDelete, setShowDelete ] = useState(false);
    const isMe = message.email === session?.user?.email;

    const deleteConfirm = async (id:string) => {
        confirmDialog({
            message: '삭제 하시겠습니까?',
            header: null,
            accept: () => deleteMessage(id),
            acceptLabel: '확인',
            rejectLabel: '취소',
        });
    }

    const handleHover = (bool) => {
        setShowDelete(bool)
    }

    return (
        <div key={message._id} className={`messageBox ${isMe && 'me'}`} onMouseOver={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
            <div className=''>
                {
                    !isMe && message?.image &&
                    <Image src={message.image} alt={message.name} width={30} height={30} style={{ borderRadius: '50%' }} />
                }
            </div>
            {
                isMe &&
                <div className='etc'>
                    { session && message.email && isMe && showDelete && 
                        <button onClick={() => deleteConfirm(message._id)}><RiDeleteBin6Line /></button>
                    }
                    <span className='time'>{dayjs(message.createdAt).format('A hh:mm')}</span>
                </div>
            }
            <div className='messageContent'>
                <span className='name'>{!isMe && message.name}</span>
                <div className="imessage">
                    <p className={isMe ? 'from-me' : 'from-them'}>{message.message}</p>
                    {
                        !isMe &&
                        <div className='etc'>
                            { session && message.email && isMe && showDelete && 
                                <button onClick={() => deleteConfirm(message._id)}><RiDeleteBin6Line /></button>
                            }
                            <span className='time'>{dayjs(message.createdAt).format('A hh:mm')}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}