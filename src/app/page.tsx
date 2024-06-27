import { api } from "@/lib/config";
import BlogList from "@/components/List";

async function getData() {
  const res = await fetch(api.getDataAll)
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const rawData = await getData()

  const list = rawData.map(data => ({
      id: data.id,
      title: data.properties.title.title[0].plain_text,
      cover: data.cover?.file?.url || data.cover?.external?.url || '',
      tags: data.properties.tag?.multi_select || [],
      createdTime: data.properties.createdAt?.date?.start || '',
      summary: data.properties.summary?.rich_text?.[0]?.plain_text || 'No summary'
  }))

  return (
    <BlogList list={list}/>
  );
}
