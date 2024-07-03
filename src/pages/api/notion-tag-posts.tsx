import { Client } from '@notionhq/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await notionDatabase.databases.query({
            database_id: process.env.NEXT_APP_NOTION_DATABASE_ID as string,
            filter: {
                property: "tag",
                multi_select: {
                    contains: req.query.tag as string
                }
            },
        })

        return res.status(200).json(db.results)
    } catch (error) {
        console.log('error', error)
        // return res.status(500).json('error')        
    }
}

export const notionDatabase = new Client({
    auth: process.env.NEXT_APP_NOTION_SECRET
})