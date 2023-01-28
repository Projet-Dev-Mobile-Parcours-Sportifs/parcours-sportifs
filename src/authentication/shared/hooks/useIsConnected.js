import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useIsConnected = () => {
  const user = useSelector((state) => state.connectedUser)
  const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    const isConnected = Object.keys(user).length > 0
    setIsConnected(isConnected)
  }, [user])

  return { isConnected }
}
