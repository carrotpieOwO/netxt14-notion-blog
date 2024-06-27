import { Client } from '@notionhq/client'

export default async function handler(req, res) {
    try {
        const db  = await notionDatabase.databases.retrieve({ database_id: process.env.NEXT_APP_NOTION_DATABASE_ID });
        const property = db.properties['tag'];

        if(property && property.multi_select) {
            return res.status(200).json(property.multi_select.options)
        }
        return res.status(204).json('없음')
    } catch (error) {
        console.log('error', error)
        return res.status(500).json('error')        
    }
}

export const notionDatabase = new Client({
    auth: process.env.NEXT_APP_NOTION_SECRET
})