import { Box, Button, Link } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useInputRules } from '../../../shared/form/inputs/hooks/useInputRules'
import { TextField } from '../../../shared/form/inputs/components/TextField'
import { useTheme } from 'styled-components'

export const LoginForm = ({ login }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { emailRules } = useInputRules()
  const theme = useTheme();

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit((form) => login(form))} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField form={{ errors, register }} id="email" label="Email" rules={emailRules} />
        <TextField type="password" form={{ errors, register }} id="password" label="Mot de passe" />
        <Button type="submit" variant="contained" style={{ margin: 20, background: theme.primary }}>Se connecter</Button>
        <Link href="/register/user" style={{color: theme.primary, textDecorationColor: theme.primary}}>Créer son compte</Link>
      </form>
    </Box>
  )
}
