import { Client } from '@notionhq/client'

export default async function handler(req, res) {
    try {
        const db = await notionDatabase.databases.query({
            database_id: process.env.NEXT_APP_NOTION_DATABASE_ID,
            filter: {
                or: [
                  {
                    property: 'title',
                    title: {
                        contains: req.query.query
                    }
                  },
                  {
                    property: 'summary',
                    rich_text: {
                        contains: req.query.query
                    }
                  },
                ],
              },
        })
        return res.status(200).json(db.results)
    } catch (error) {
        console.log('error', error)
        return res.status(500).json('error')   
    }
}

export const notionDatabase = new Client({
    auth: process.env.NEXT_APP_NOTION_SECRET
})