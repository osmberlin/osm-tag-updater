import { ReactLocationDevtools } from '@tanstack/react-location-devtools'
import { Layout } from '@components/Layout'
import { fetchWayById } from '@components/queryWay'
import {
  MakeGenerics,
  Outlet,
  ReactLocation,
  createHashHistory,
  Router,
} from '@tanstack/react-location'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import { PageWayShow } from './pages'
import { PageWayIndex } from '@pages/PageWay'
import { PageManualShow } from '@pages/PageManual/PageManualShow'
import { PageHomeShow } from '@pages/PageHome'
import { PageListShow } from '@pages/PageList'

type LocationGenerics = MakeGenerics<{
  Params: { wayId: string }
}>

const hashHistory = createHashHistory()

const location = new ReactLocation<LocationGenerics>({ history: hashHistory })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // https://tanstack.com/query/v4/docs/guides/window-focus-refetching#disabling-globally
      // We dont want since since the data should not update automatically so we dont loose change made be the user
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        location={location}
        // basepath="osm-tag-updater"
        routes={[
          {
            path: '/',
            element: <PageHomeShow />,
          },
          {
            path: '/manual',
            element: <PageManualShow />,
          },
          {
            path: '/list',
            element: <PageListShow />,
          },
          {
            path: '/way',
            element: <Outlet />,
            children: [
              { path: '/', element: <PageWayIndex /> },
              {
                path: ':wayId',
                element: <PageWayShow />,
                loader: ({ params: { wayId } }) =>
                  queryClient.getQueryData(['way', wayId]) ??
                  queryClient.fetchQuery(['way', wayId], () =>
                    fetchWayById(wayId)
                  ),
              },
            ],
          },
        ]}
      >
        <Layout>
          <Outlet />
        </Layout>
        <ReactLocationDevtools position="bottom-left" />
      </Router>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
