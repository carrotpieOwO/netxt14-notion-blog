import { api } from "@/lib/config";
import BlogList from "@/components/List";
import { Social } from "@/components/Social";
import { Cover } from "@/components/Cover";

async function getData() {
  const res = await fetch(api.getDataAll)
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

async function getCoverImages() {
	const res = await fetch(api.getMainImages)
	
	if (!res.ok) {
	  throw new Error('Failed to fetch data')
	}
	return res.json()
}
export default async function Home() {
  const rawData = await getData()
  const coverImages = await getCoverImages()
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
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <div className="notion-page-scroller">
            <Cover coverImage={coverImages} />
            <main className="notion-page notion-page-has-cover notion-page-has-icon notion-page-has-image-icon notion-full-page index-page">
              <div className="notion-page-content notion-page-content-has-aside">
                <BlogList list={list}/>
                <Social />
              </div>
            </main>
          </div>
      </div>
    </>
  );
}
