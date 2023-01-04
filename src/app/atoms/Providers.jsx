import { Provider } from "react-redux"
import { store } from "../../shared/stores/store"
import { getTheme } from "../../themes/default"
import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={getTheme()}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}
