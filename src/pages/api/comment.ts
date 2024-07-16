
import { connectDB } from "@/utill/database";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const db = (await connectDB).db('ha0peno-notion')
    if(req.method === 'GET') {
        const list = await db.collection('guestbook').find({}).toArray()
        
        const messages = list.reduce((acc, message) => {
            const date = dayjs(message.createdAt).format('YYYY-MM-DD')
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(message);
            return acc;
        }, {});
        
        console.log('list', list, messages)
        return res.status(200).json(messages)
    }

    if(req.method === 'POST') {
        const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.socket.remoteAddress
        req.body.ip = ip;

        // if( ip === '::1') {
        //     return res.status(200).json('로컬이어서 디비에 안올릴거임')
        // }

        try {
            await db.collection('guestbook').insertOne(req.body)    

            return res.status(200).json('success')

        } catch (error) {
            return res.status(500).json(error)  
        }
    }
}