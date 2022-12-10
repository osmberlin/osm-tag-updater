import { Link, useNavigate } from '@tanstack/react-location'
import { InputOsmId } from '../../components/Tool/InputOsmId'

export const PageWayIndex: React.FC = () => {
  const navigate = useNavigate()

  const onSubmit = (wayId: number) => {
    navigate({ to: `/way/${wayId}` })
  }

  return (
    <section>
      <InputOsmId currentWayId={858659630} onSubmit={onSubmit} />
      <p>
        <Link
          to="/way/858659630"
          className="text-md items-center rounded border bg-pink-100 px-1 font-semibold shadow hover:bg-blue-50"
        >
          Test way/<code>858659630</code>
        </Link>
      </p>
    </section>
  )
}
