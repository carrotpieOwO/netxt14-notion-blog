import { notionBaseUrl } from '@/lib/config'
import { mapImageUrl } from '@/lib/map-image-url'
import { NextApiRequest, NextApiResponse } from 'next'
import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const notion = new NotionAPI()
        const response = await notion.getPage(notionBaseUrl as string)
        const block = response.block
        const id = idToUuid(notionBaseUrl)
        const coverUrl = block[id].value.format?.page_cover
        const heroUrl = block[id].value.format?.page_icon
        if(coverUrl && heroUrl) {
            const coverImage =  mapImageUrl(coverUrl, block[id].value)
            const heroImage = mapImageUrl(heroUrl, block[id].value)
            return res.status(200).json({coverImage, heroImage})
        } else {
            return res.status(204).json('없음')
        }
        
    } catch (error) {
        console.log('error', error)
        return res.status(500).json('error')        
    }
}