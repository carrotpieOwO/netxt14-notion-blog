import NotionPage from '@/components/NotionPage'

async function getData(pageId: string) {
	const res = await fetch(`http:localhost:3000/api/notion-detail?pageId=${pageId}`)
	
	if (!res.ok) {
	  throw new Error('Failed to fetch data')
	}
	return res.json()
}


export default async function Detail ({params}) {
  // todo: 댓글
  const recordMap = await getData(params.pageId)
  
  return <NotionPage recordMap={recordMap} />
}