import { api } from "@/lib/config";
import BlogList from "@/components/List";
//import getBlurImg from "@/lib/get-blur-image";

export interface NotionDatabasePage {
  id: string;
  properties: {
      title: {
          title: Array<{
              plain_text: string;
          }>;
      };
      tag?: {
          multi_select: Array<{ name: string }>;
      };
      createdAt?: {
          date: {
              start: string;
          };
      };
      summary?: {
          rich_text: Array<{
              plain_text: string;
          }>;
      };
  };
  cover?: {
      file?: {
          url?: string;
      };
      external?: {
          url?: string;
      };
  };
}

export interface CustomPage {
  id: string;
  title: string;
  cover: string;
  blur?: string;
  tags: Array<{ name?: string, id?: string, color?: string }>;
  createdTime: string;
  summary: string;
}

async function getData() {
  const res = await fetch(api.getDataAll)
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const rawData = await getData()


  const list = await Promise.all(
    rawData.map(async (data: NotionDatabasePage): Promise<CustomPage> => {
      const coverUrl = data.cover?.file?.url || data.cover?.external?.url || '';
      //const blurUrl = coverUrl ? await getBlurImg(coverUrl) : ''; // 빈 문자열 처리
  
      return {
        id: data.id,
        title: data.properties.title.title[0].plain_text,
        cover: coverUrl,
        //blur: blurUrl,
        tags: data.properties.tag?.multi_select || [],
        createdTime: data.properties.createdAt?.date?.start || '',
        summary: data.properties.summary?.rich_text?.[0]?.plain_text || 'No summary'
      };
    })
  )
  
  return <BlogList list={list}/>
}
