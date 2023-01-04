import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFitnessTrailApi } from "../../../shared/api/hooks/useFitnessTrailApi"
import { call } from "../../../shared/api/stores/api"
import { DataList } from "../../../shared/list/molecules/DataList"

export const StudentModulesList = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.connectedUser)
  const { call: getStudentClassroom } = useFitnessTrailApi(`/items/studentclassroom?filter={ "idStudent": { "_eq": ${user.id} }}`, 'get', {})

  useEffect(() => {
    const getModules = async () => {
      const studentClassrooms = await getStudentClassroom()
      const ids = studentClassrooms.map(({ id }) => id)
      dispatch(call(`/items/module?filter={ "idClassroom": { "_in": ${ids} }}`, [], "get"))
    }
    getModules()
  }, [])

  const typeList = {
    name: "titre",
  }
  const { data, isLoading } = useSelector((state) => state.fitnessTrailApi)

  return (
    <DataList
      title="Liste de mes modules"
      isLoading={isLoading}
      data={data?.modules}
      noDataTitle="Vous n'avez pas de modules"
      typeList={typeList}
    />
  )
}
