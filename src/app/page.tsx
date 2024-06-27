import { api } from "@/lib/config";
import BlogList from "@/components/List";

async function getData() {
  const res = await fetch(api.getDataAll)
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
async function getTagList() {
  const res = await fetch(api.getTagList)
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const rawData = await getData()
  const tagList = await getTagList();
  console.log('taglist', tagList)

  tagList.unshift({ id: 'all', name: 'all', color: 'gray', description: null })

  const list = rawData.map(data => ({
      id: data.id,
      title: data.properties.title.title[0].plain_text,
      cover: data.cover?.file?.url || data.cover?.external?.url || '',
      tags: data.properties.tag?.multi_select || [],
      createdTime: data.properties.createdAt?.date?.start || '',
      summary: data.properties.summary?.rich_text?.[0]?.plain_text || 'No summary'
  }))

  return (
    <>
      <div>
      {
        tagList.map(tag => <div key={tag.id} className={`notion-property-multi_select-item notion-item-${tag.color}`}>{tag.name}</div>)
      }
      </div>
      <BlogList list={list}/>
    </>
  );
}
