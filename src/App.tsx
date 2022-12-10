import { Layout } from '@components/Layout'
import { PageList } from '@pages/PageList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createReactRouter,
  createRouteConfig,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import './index.css'
import { PageHome } from './pages'

const rootRoute = createRouteConfig({
  component: () => {
    return (
      <>
        rootRoute
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
      </>
    )
  },
})
const indexRoute = rootRoute.createRoute({
  path: '/osm-tag-updater',
  component: () => {
    return (
      <div className="p-2">
        indexRoute
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})
const listRoute = rootRoute.createRoute({
  path: '/list',
  component: () => (
    <>
      listRoute
      <Outlet />
    </>
  ),
})
const listIndexRoute = listRoute.createRoute({
  path: '/',
  component: () => (
    <>
      listIndexRoute
      {/* <PageList /> */}
    </>
  ),
})

const routeConfig = rootRoute.addChildren([
  indexRoute,
  listRoute.addChildren([listIndexRoute]),
])

const router = createReactRouter({
  routeConfig,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}

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
      <RouterProvider router={router} />
      <ReactQueryDevtools position="bottom-right" />
      {/* <Layout></Layout> */}
    </QueryClientProvider>
  )
}

export default App
