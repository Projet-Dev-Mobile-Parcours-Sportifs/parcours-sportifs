import { Button } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useFitnessTrailApi } from "../../../shared/api/hooks/useFitnessTrailApi"
import { FormBox } from "../../../shared/form/inputs/components/FormBox"
import { TextField } from '../../../shared/form/inputs/components/TextField'

export const AddStudentToProfessor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const messages = { success: "l'élève a été ajouté" }
  const { call: create } = useFitnessTrailApi({ endpoint: `/items/studentclassroom`, action: 'post', messages })
  const { call: getUser } = useFitnessTrailApi({
    endpoint: `/users`, action: 'get', messages: { error: "cet utilisateur n'existe pas" }
  })

  const createGoal = async (form) => {
    const userToAdd = (await getUser({}, {}, `/users?filter={ "email": { "_eq": "${form.email}" }}`))[0]
    await create({
      idClassroom: localStorage.getItem("classroom"),
      idStudent: userToAdd.id
    })
    navigate(`/teacher/student/list`)
  }

  return (
    <FormBox title="Ajouter l'élève à votre liste d'élèves" onSubmit={handleSubmit((form) => createGoal(form))}>
      <TextField form={{ errors, register }} id='email' label="Email de l'utilisateur" rules={{ required: "Veuillez entrer l'email de l'utilisateur" }} />
      <Button type="submit" variant="contained" style={{ margin: 20 }}>Ajouter</Button>
    </FormBox>
  )
}
