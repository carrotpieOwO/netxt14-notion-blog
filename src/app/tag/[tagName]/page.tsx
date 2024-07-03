import { api } from "@/lib/config";
import BlogList from "@/components/List";
import getBlurImg from "@/lib/get-blur-image";
import { CustomPage, NotionDatabasePage } from "@/app/page";

async function getData(tagName:string) {
  const res = await fetch(`${api.getTagPosts}?tag=${tagName}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function TagFilteredList({ params }: {params: { tagName: string }}) {
  const rawData = await getData(params.tagName)

  const list = await Promise.all(
    rawData.map(async (data: NotionDatabasePage): Promise<CustomPage> => {
      const coverUrl = data.cover?.file?.url || data.cover?.external?.url || '';
      const blurUrl = coverUrl ? await getBlurImg(coverUrl) : ''; // 빈 문자열 처리
  
      return {
        id: data.id,
        title: data.properties.title.title[0].plain_text,
        cover: coverUrl,
        blur: blurUrl,
        tags: data.properties.tag?.multi_select || [],
        createdTime: data.properties.createdAt?.date?.start || '',
        summary: data.properties.summary?.rich_text?.[0]?.plain_text || 'No summary'
      };
    })
  )
  return <BlogList list={list}/>
}