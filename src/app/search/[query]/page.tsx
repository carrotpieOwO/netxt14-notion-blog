import { api } from "@/lib/config";
import BlogList from "@/components/List";
import getBlurImg from "@/lib/get-blur-image";

async function getData(query) {
  const res = await fetch(`${api.searchNotion}?query=${query}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function SearchList ({ params }) {
  const rawData = await getData(params.query)
  
  const list = await Promise.all(
    rawData.map(async data => ({
        id: data.id,
        title: data.properties.title.title[0].plain_text,
        cover: data.cover?.file?.url || data.cover?.external?.url || '',
        blur: await getBlurImg(data.cover?.file?.url || data.cover?.external?.url),
        tags: data.properties.tag?.multi_select || [],
        createdTime: data.properties.createdAt?.date?.start || '',
        summary: data.properties.summary?.rich_text?.[0]?.plain_text || 'No summary'
    }))
  )

  return <BlogList list={list}/>
}