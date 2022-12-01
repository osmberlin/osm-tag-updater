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
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          This project is part of the OpenStreetMap Parking Space Project
        </p>
      </div>
    </footer>
  )
}
