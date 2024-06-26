import { notionBaseUrl } from '@/lib/config'
import { getPageCollectionId } from '@/lib/get-collection-id'
import { mapImageUrl } from '@/lib/map-image-url'
import { getPage } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'
import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'
import { defaultMapImageUrl } from 'react-notion-x'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const notion = new NotionAPI()
        
        
        const response = await notion.getPage(notionBaseUrl as string)
        //console.log('props', pages)
        //console.log('response ::: ', response)

        // response.block.forEach(block => {
        //     console.log('block ::: ', block.value)
        // })
        //console.log('block ::: ', response.block)
        //const collection = Object.values(response.collection)[0]?.value
        const block = response.block
        // const schema = collection?.schema
        const id = idToUuid(notionBaseUrl)
        const coverImage = block[id].value.format?.page_cover
        console.log('coverImage',  coverImage)
        // const collectionId = await getPageCollectionId(notionBaseUrl as string)
        // const recordMap = await notion.getCollectionData(collectionId, collectionId, null, { loadContentCover: true })
        // console.log('collectionId', collectionId, recordMap)
        if(coverImage) {
            const defaultImage =  mapImageUrl(coverImage, block[id].value)
            console.log('defaultImage', defaultImage)
            return res.status(200).json(defaultImage)
        } else {
            return res.status(204).json('없음')
        }
        // return res.status(200).json(recordMap)
        
    } catch (error) {
        console.log('error', error)
        return res.status(500).json('error')        
    }
}