import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

export const useAuthenticationMiddleware = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state.connectedUser)

  const hasUrl = (url) => location.pathname.includes(url)

  useEffect(() => {
    const isConnected = Object.keys(user).length > 0
    if ((!hasUrl('register') && !hasUrl('login')) && !isConnected) navigate('/register/user')
  }, [location])
}
