import { AppView } from "../atoms/AppView"
import { Providers } from "../atoms/Providers"
import './styles/App.css'

export const App = () => {
  return (
    <Providers>
      <AppView />
    </Providers>
  )
}
