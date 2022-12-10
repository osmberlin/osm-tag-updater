import { ExternalLink } from '@components/Link'

export const Header: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        <div className="-mx-5 -my-2 flex flex-col flex-wrap">
          <h1 className="mb-3 self-center text-3xl font-light text-violet-700">
            OSM Parking Lane Tag Updater{' '}
            <small className="text-xs">{APP_VERSION}</small>
          </h1>
          <details
            open
            className="prose my-5 max-w-prose self-center leading-tight"
          >
            <summary className="cursor-pointer text-center hover:underline">
              About this tool…
            </summary>
            <p>
              This tool helps you to update the old <code>parking:lane</code>{' '}
              and <code>parking:condition</code> tagging to the revised schema
              which was approved in December 2022.
            </p>
            <p>
              <strong className="text-violet-500">
                Please review all tags before updating date in OSM.
              </strong>
              <br />
              <span className="text-gray-400">
                Automated edits are a violation of the{' '}
                <ExternalLink
                  blank
                  href="https://wiki.openstreetmap.org/wiki/Automated_Edits_code_of_conduct"
                  className="font-normal text-gray-400 no-underline hover:underline"
                >
                  Automated Edits code of conduct
                </ExternalLink>
                .
              </span>
            </p>
            <p>
              The tool will <strong>show notices</strong> whenever something
              needs your attention. However there is some{' '}
              <strong>wild tagging out there</strong>, which this tool will not
              understand. Please{' '}
              <ExternalLink
                blank
                href="https://wiki.openstreetmap.org/wiki/Street_parking"
              >
                read the Wiki
              </ExternalLink>{' '}
              and <strong>update those tags manually</strong>.
            </p>
            <p>
              Also consider checking the actual parking situation on aerial
              imagery and streetlevel images to make sure nothing change since
              this road segment was mapped.
            </p>
          </details>
        </div>
      </div>
    </section>
  )
}
