import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useIsConnected } from "./useIsConnected"
import { useRoles } from "./useRoles"

export const useAuthenticationMiddleware = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isConnected } = useIsConnected()
  const { isProfessor, isStudent } = useRoles()

  const hasUrl = (url) => location.pathname.includes(url)
  const isUrlBeginningWith = (url) => location.pathname.startsWith(url)

  useEffect(() => {
    if ((!hasUrl('register') && !hasUrl('login')) && !isConnected) navigate('/register/student')
    if (isProfessor && isUrlBeginningWith('/student')) navigate(-1)
    if (isStudent && isUrlBeginningWith('/professor')) navigate(-1)
  }, [location])
}
