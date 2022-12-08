import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider, Route} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Create from './routes/create'
import Get from './routes/get'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/create', element: <Create /> },
  { path: '/get', element: <Get /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
    <RouterProvider router={router}/>
    </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
