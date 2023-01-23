import { Link } from '@tanstack/react-location'

export const PageHomeShow: React.FC = () => {
  return (
    <section className="space-y-5 py-5">
      <h2>
        Option 1:{' '}
        <Link
          className={
            'text-violet-700 underline underline-offset-4 hover:text-violet-600 hover:decoration-2'
          }
          to="/way"
        >
          Load tags from OSM way
        </Link>
      </h2>
      <h2>
        Option 2:{' '}
        <Link
          className={
            'text-violet-700 underline underline-offset-4 hover:text-violet-600 hover:decoration-2'
          }
          to="/manual"
        >
          Manually input tags
        </Link>
      </h2>
    </section>
  )
}
