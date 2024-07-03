import axios from "axios";

export const getFullBlockId = (blockId: string) => {
    if (blockId.match("^[a-zA-Z0-9]+$")) {
        return blockId.substr(0, 8) + "-"
            + blockId.substr(8, 4) + "-"
            + blockId.substr(12, 4) + "-"
            + blockId.substr(16, 4) + "-"
            + blockId.substr(20, 32)
    } else {
        return blockId
    }
}

export const getPageCollectionId = async (pageId: string) => {
    
    axios
    let res = await axios.post('https://www.notion.so/api/v3/loadPageChunk',
        { "pageId": getFullBlockId(pageId), "limit": 50, "cursor": { "stack": [] }, "chunkNumber": 0, "verticalColumns": false },
        {
            headers: { 'content-type': 'application/json;charset=UTF-8' }
        })
    let collectionId = Object.entries(res.data.recordMap.collection)[0][0]
    return collectionId
}
