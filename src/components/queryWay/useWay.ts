import { useQuery } from '@tanstack/react-query'
import { fetchWayById } from './fetchWayById'
import { Way } from './type'

export const useWay = (wayId: string) => {
  return useQuery<Way, any>(['way', wayId], () => fetchWayById(wayId), {
    enabled: !!wayId,
  })
}
