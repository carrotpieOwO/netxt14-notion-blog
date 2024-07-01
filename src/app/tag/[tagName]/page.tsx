import { api } from "@/lib/config";
import BlogList from "@/components/List";
import getBlurImg from "@/lib/get-blur-image";

async function getData(tagName) {
  const res = await fetch(`${api.getTagPosts}?tag=${tagName}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function TagFilteredList({ params }) {
  const rawData = await getData(params.tagName)

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