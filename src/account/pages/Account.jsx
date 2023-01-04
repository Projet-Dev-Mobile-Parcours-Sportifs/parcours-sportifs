import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useFitnessTrailApi } from "../../shared/api/hooks/useFitnessTrailApi";
import { useInputRules } from "../../shared/form/inputs/hooks/useInputRules";
import { TextField } from "../../shared/form/inputs/components/TextField"
import { useTheme } from 'styled-components'

export const Account = () => {
const theme = useTheme();
const user = useSelector((state) => state.connectedUser)

  const { call: updateUser } = useFitnessTrailApi({ endpoint: '/users/' + user.id, action: 'patch' })

  const update = (form) => {
    const { firstName, lastName, email } = form
    const params = {
      first_name: firstName,
      last_name: lastName,
      email,
    }
    updateUser(params)
  }

const { register, handleSubmit, formState: { errors }} = useForm()
const { emailRules } = useInputRules()

 if(Object.keys(user).length === 0) return ( 
 <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "10vw",
  }}
>
  <CircularProgress color="inherit" />
</div>
)

  return (
    <>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
        <h1 style={{ textAlign: "center" }}>Page Account</h1>  
        <form onSubmit={handleSubmit(update)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField form={{ errors, register }} label="Prénom" defaultValue={user["first_name"]} id="firstName" rules={{ required: 'Veuillez entrer un prénom'}} />
            <TextField form={{ errors, register }} label="Nom" defaultValue={user["last_name"]} id="lastName" rules={{ required: 'Veuillez entrer un nom'}} />
            <TextField form={{ errors, register }} label="Email" defaultValue={user["email"]} id="email" rules={emailRules} />
            <Button type="submit" variant="contained" style={{ margin: 20, background: theme.primary }}>Modifier vos infos</Button>
        </form>  
      </Box>
    </>
  );
};

export default Account;
