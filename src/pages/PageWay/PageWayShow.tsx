import { Tool } from '@components/Tool'
import { useMatch, useNavigate } from '@tanstack/react-location'
import { useWay } from '../../components/queryWay'
import { InputOsmId } from '../../components/Tool/InputOsmId'

export const PageWayShow: React.FC = () => {
  const {
    params: { wayId },
  } = useMatch()
  const { isInitialLoading, isError, data, error, isFetching } = useWay(wayId)

  const navigate = useNavigate()

  const changeWay = (wayId: number) => {
    navigate({ to: `/way/${wayId}` })
  }

  if (!data) {
    if (isError) {
      return <span>Error: {error.message}</span>
    }
    if (isInitialLoading) {
      return <span>Loading…</span>
    }
    return <span>Not ready …</span>
  }
  if (isFetching) {
    return <span>Fetching…</span>
  }

  return (
    <>
      <section>
        <InputOsmId currentWayId={wayId} onSubmit={changeWay} />
        <Tool rawTags={data} />
      </section>
    </>
  )
}
