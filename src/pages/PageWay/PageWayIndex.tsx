import { buttonStyleSecondary } from '@components/Link'
import { Link, useNavigate } from '@tanstack/react-location'
import { InputOsmId } from '../../components/Tool/InputOsmId'

export const PageWayIndex: React.FC = () => {
  const navigate = useNavigate()

  const onSubmit = (wayId: number) => {
    navigate({ to: `/way/${wayId}` })
  }

  return (
    <section className="space-y-5">
      <InputOsmId currentWayId={858659630} onSubmit={onSubmit} />
      <p>
        <Link to="/way/858659630" className={buttonStyleSecondary}>
          Test way/858659630
        </Link>
      </p>
    </section>
  )
}
