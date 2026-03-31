import { createBrowserRouter } from 'react-router-dom'
import App from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import('./pages/HomePage')
          return { Component: module.HomePage }
        },
      },
      {
        path: 'shop',
        lazy: async () => {
          const module = await import('./pages/ShopPage')
          return { Component: module.ShopPage }
        },
      },
      {
        path: 'for-you',
        lazy: async () => {
          const module = await import('./pages/ForYouPage')
          return { Component: module.ForYouPage }
        },
      },
      {
        path: 'auth',
        lazy: async () => {
          const module = await import('./pages/AuthPage')
          return { Component: module.AuthPage }
        },
      },
    ],
  },
])
