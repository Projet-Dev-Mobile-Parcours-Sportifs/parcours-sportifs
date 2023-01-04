import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useIsConnected } from "./useIsConnected"

export const useRoles = () => {
  const { isConnected } = useIsConnected()
  const user = useSelector((state) => state.connectedUser)
  const [isProfessor, setIsProfessor] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [role, setRole] = useState('')

  useEffect(() => {
    if (!isConnected) {
      setIsProfessor(false)
      setIsStudent(false)
      setRole('')
    }
    if (user.role === process.env.REACT_APP_PROFESSOR_ROLE_ID) {
      setIsProfessor(true)
      setIsStudent(false)
      setRole('professor')
    }
    if (user.role === process.env.REACT_APP_USER_ROLE_ID) {
      setIsProfessor(false)
      setIsStudent(true)
      setRole('student')
    }
  }, [user])

  return { isProfessor, isStudent, role }
}
