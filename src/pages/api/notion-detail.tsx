import { NextApiRequest, NextApiResponse } from 'next'
import { NotionAPI } from 'notion-client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const notion = new NotionAPI()
        const recordMap = await notion.getPage(req.query.pageId as string)
        
        if(recordMap) {
            return res.status(200).json(recordMap)
        } else {
            return res.status(204).json('없음')
        }
        
    } catch (error) {
        console.log('error', error)
        return res.status(500).json('error')        
    }
}