export const Header: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        <div className="-mx-5 -my-2 flex flex-wrap justify-center">
          <h1 className="mb-3 text-3xl font-light text-violet-700">
            OSM Parking Lane Tag Updater{' '}
            <small className="text-xs">{APP_VERSION}</small>
          </h1>
        </div>
      </div>
    </section>
  )
}
