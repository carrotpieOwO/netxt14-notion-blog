import { Client } from '@notionhq/client'

export default async function handler(req, res) {
    console.log('req :::: ', req.query.query)
    try {
        const db = await notionDatabase.databases.query({
            database_id: process.env.NEXT_APP_NOTION_DATABASE_ID,
            filter: {
                
                    property: 'title',
                    contains: req.query.query,
                  
                // or: [
                //   {
                //     property: 'title',
                //     contains: req.query.query,
                //   },
                //   {
                //     property: 'summary',
                //       contains: req.query.query,
                //   },
                // ],
              },
        })
        console.log('db', db)
        return res.status(200).json(db.results)
    } catch (error) {
        console.log('error', error)
        // return res.status(500).json('error')        
    }
}

export const notionDatabase = new Client({
    auth: process.env.NEXT_APP_NOTION_SECRET
})