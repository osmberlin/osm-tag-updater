import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { PageHome } from './pages'

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
      <PageHome />
    </QueryClientProvider>
  )
}

export default App
