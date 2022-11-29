import { useQuery } from '@tanstack/react-query'

export const useOsmQuery = (osmId: number) => {
  const query = useQuery({
    queryKey: ['osm/way', osmId],
    // https://wiki.openstreetmap.org/wiki/API_v0.6#Read:_GET_/api/0.6/[node|way|relation]/#id
    // https://tanstack.com/query/v4/docs/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default
    queryFn: async () => {
      const response = await fetch(
        `https://www.openstreetmap.org/api/0.6/way/${osmId}.json`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
  return query
}
