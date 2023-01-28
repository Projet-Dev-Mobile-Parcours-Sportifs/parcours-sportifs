import { Button } from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useFitnessTrailApi } from "../../shared/api/hooks/useFitnessTrailApi"
import { FormBox } from "../../shared/form/inputs/components/FormBox"
import { TextField } from "../../shared/form/inputs/components/TextField"

export const ModifyGoal = () => {
  const { goalId, moduleId } = useParams()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const messages = { success: "l'objectif a été modifié" }
  const { call: getGoal, data, isLoading } = useFitnessTrailApi({ endpoint: `/items/goal/${goalId}`, action: 'get' })
  const { call: modify } = useFitnessTrailApi({ endpoint: `/items/goal/${goalId}`, action: 'patch', messages })
  const modifyGoal = async (form) => {
    await modify(form)
    navigate(`/teacher/module/${moduleId}`)
  }

  useEffect(() => { getGoal() }, [])
  if (isLoading) return

  return (
    <FormBox title="Modifier l'objectif" onSubmit={handleSubmit((form) => modifyGoal(form))}>
      <TextField form={{ errors, register }} defaultValue={data?.name} id='name' label='Nom' />
      <TextField form={{ errors, register }} defaultValue={data?.level} id='level' label='Niveau' />
      <Button type="submit" variant="outlined" style={{ margin: 20, color: "#28666E", borderColor: "#28666E", }}>Valider</Button>
    </FormBox>
  )
}
