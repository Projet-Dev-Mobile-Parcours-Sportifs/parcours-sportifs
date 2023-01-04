import MuiTextField from '@mui/material/TextField'
import { useInputError } from '../hooks/useInputError'
import { useTheme } from '@mui/private-theming'

export const TextField = ({ form, id, style, rules, onChange, ...props }) => {
  const { errors, register } = form
  const { hasError, errorMessage } = useInputError(errors)
  const theme = useTheme()

  return <MuiTextField
    {...props}
    {...register(id, rules)}
    error={hasError(id)}
    helperText={errorMessage(id)}
    style={{ margin: 10, width: 360,...style }}
    onChange={onChange}
  />
}
