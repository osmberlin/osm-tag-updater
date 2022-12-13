import { ExternalLink } from '@components/Link'
import { Link } from '@tanstack/react-location'

const navigation = {
  main: [
    {
      name: 'Project website (German)',
      href: 'https://parkraum.osm-verkehrswende.org/',
    },
    {
      name: 'Imprint & Contact & Privacy Statement (German)',
      href: 'https://parkraum.osm-verkehrswende.org/contact',
    },
    {
      name: 'Wiki Documentation',
      href: 'https://wiki.openstreetmap.org/wiki/Street_parking',
    },
    {
      name: 'Code on Github',
      href: 'https://github.com/osmberlin/osm-tag-updater',
    },
  ],
}

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <ExternalLink
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900"
                blank
              >
                {item.name}
              </ExternalLink>
            </div>
          ))}
          <div className="px-5 py-2">
            <Link
              to="/list"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              List of all tag transformations
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          This project is part of the OpenStreetMap Parking Space Project.
        </p>
      </div>
    </footer>
  )
}
