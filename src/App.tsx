import { Outlet } from 'react-router-dom'
import { MobileNav } from './components/MobileNav'
import { Shell } from './components/Shell'

export function App() {
  return (
    <Shell>
      <Outlet />
      <MobileNav />
    </Shell>
  )
}

export default App
