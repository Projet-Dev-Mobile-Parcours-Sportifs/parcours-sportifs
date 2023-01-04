import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useIsConnected } from "./useIsConnected"

export const useAuthenticationMiddleware = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isConnected } = useIsConnected()

  const hasUrl = (url) => location.pathname.includes(url)

  useEffect(() => {
    if ((!hasUrl('register') && !hasUrl('login')) && !isConnected) navigate('/register/user')
  }, [location])
}
