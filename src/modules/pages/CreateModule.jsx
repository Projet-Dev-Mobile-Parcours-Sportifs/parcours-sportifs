import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useFitnessTrailApi } from "../../shared/api/hooks/useFitnessTrailApi";
import { FormBox } from "../../shared/form/inputs/components/FormBox";
import { TextField } from "../../shared/form/inputs/components/TextField";

export const CreateModule = () => {
  const { classroomId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const messages = { success: "le module a été créé" };
  const { call: create } = useFitnessTrailApi({
    endpoint: `/items/module`,
    action: "post",
    messages,
  });
  const createModule = async (form) => {
    await create({ ...form, idClassroom: classroomId });
    navigate(`/teacher/modules/list`);
  };

  return (
    <FormBox
      title="Créer le module"
      onSubmit={handleSubmit((form) => createModule(form))}
    >
      <TextField
        form={{ errors, register }}
        id="name"
        label="Nom du module"
        rules={{ required: "Veuillez entrer le nom du module" }}
      />
      <Button type="submit" variant="outlined" style={{ margin: 20 ,color: "#28666E", borderColor: "#28666E" }}>
        Valider
      </Button>
    </FormBox>
  );
};
