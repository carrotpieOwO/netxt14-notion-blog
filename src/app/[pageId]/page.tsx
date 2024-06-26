import NotionPage from '@/components/NotionPage'
import { api } from '@/lib/config'

async function getData(pageId: string) {
	const res = await fetch(`${api.getDetailData}?pageId=${pageId}`)
	
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