import { Link } from '@tanstack/react-location'

export const PageHomeShow: React.FC = () => {
  return (
    <section>
      <h2>
        Option 1: <Link to="/way">Load tags from OSM way</Link>
      </h2>
      <h2>
        Option 2: <Link to="/manual">Manually input tags</Link>
      </h2>
    </section>
  )
}
