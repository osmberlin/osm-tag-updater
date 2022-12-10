import { tagsTemplates } from '@components/Tool/transpose'

export const PageListShow: React.FC = () => {
  return (
    <section>
      <h1 className="mb-10 text-center text-2xl">
        A list of tag transformations
      </h1>
      <table className="min-w-full">
        <thead className="border-b-2 border-violet-300">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
            >
              Old tag
            </th>
            <th
              scope="col"
              className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
            >
              New tag (maybe missing fields)
            </th>
            <th
              scope="col"
              className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
            >
              Compare type
            </th>
            <th
              scope="col"
              className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
            >
              Optional message
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-violet-200">
          {Object.entries(tagsTemplates).map(([oldKey, newObject]) => {
            return (
              <tr key={oldKey}>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                  <code>{oldKey}</code>
                </td>
                <td className="py-4 px-3 text-sm text-gray-500">
                  <code>
                    {newObject.newTags.length === 1
                      ? newObject.newTags
                      : JSON.stringify(newObject.newTags, undefined, 2)}
                  </code>
                  <code className="break-words">
                    {Boolean(newObject.missingField) &&
                      JSON.stringify(newObject.missingField, undefined, 2)}
                  </code>
                </td>
                <td className="py-4 px-3 text-sm text-gray-500">
                  {newObject.compare}
                </td>
                <td className="py-4 px-3 text-sm text-gray-500">
                  {newObject.msg}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
