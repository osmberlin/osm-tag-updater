import axios from 'axios'
import { Way } from './type'

export const fetchWayById = async (wayId: string) => {
  // https://wiki.openstreetmap.org/wiki/API_v0.6#Read:_GET_/api/0.6/[node|way|relation]/#id
  // https://tanstack.com/query/v4/docs/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default
  const { data }: { data: Way } = await axios.get(
    `https://www.openstreetmap.org/api/0.6/way/${wayId}.json`
  )
  return data
}
