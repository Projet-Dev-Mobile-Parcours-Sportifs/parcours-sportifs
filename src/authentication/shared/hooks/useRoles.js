import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useIsConnected } from "./useIsConnected"

export const useRoles = () => {
  const { isConnected } = useIsConnected()
  const user = useSelector((state) => state.connectedUser)
  const [isProfessor, setIsProfessor] = useState(false)
  const [isStudent, setIsStudent] = useState(false)

  useEffect(() => {
    if (!isConnected) {
      setIsProfessor(false)
      setIsStudent(false)
    }
    if (user.role === process.env.REACT_APP_PROFESSOR_ROLE_ID) {
      setIsProfessor(true)
      setIsStudent(false)
    }
    if (user.role === process.env.REACT_APP_USER_ROLE_ID) {
      setIsProfessor(false)
      setIsStudent(true)
    }
  }, [user])

  return { isProfessor, isStudent }
}
