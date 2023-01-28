import { List } from "../../../shared/components/atoms/List/List";
import { Action } from "../../../shared/components/atoms/Action/Action";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useModuleList, useModule } from "../hooks/useModuleList";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFitnessTrailApi } from "../../../shared/api/hooks/useFitnessTrailApi";
import CreateIcon from "@mui/icons-material/Create";

export const ModuleList = () => {
  const { fetchData } = useModule();

  const navigate = useNavigate();
  const { call: callDelete } = useFitnessTrailApi({
    endpoint: "",
    action: "delete",
  });
  const deleteModule = async (id) => {
    await callDelete("", "", `/items/module/${id}`);
    fetchData();
  };
  const { data, isLoading } = useSelector((state) => state.fitnessTrailApi);
  const hasDatas = !isLoading.modules && data.modules.length > 0;
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Liste des module</h1>
      <div className="buttonAdd">
        <Button
          variant="outlined"
          style={{
            color: "#28666E",
            borderColor: "#28666E",
          }}
          onClick={() =>
            navigate(
              `/teacher/classroom/${localStorage.getItem(
                "classroom"
              )}/modules/create`
            )
          }
        >
          Ajouter des modules
        </Button>
      </div>
      {isLoading.modules ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10vw",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      ) : hasDatas ? (
        <div className="list">
          {data.modules.map(function (object, key) {
            return (
              <List
                displayList={object}
                typeList={useModuleList}
                key={key}
                action={
                  <>
                    <Action
                      action={() => navigate(`/teacher/module/${object.id}`)}
                      icon={<VisibilityIcon></VisibilityIcon>}
                    ></Action>
                    <Action
                      action={() =>
                        navigate(`/teacher/module/${object.id}/modify`)
                      }
                      icon={<CreateIcon></CreateIcon>}
                    ></Action>
                    <Action
                      action={() => deleteModule(object.id)}
                      icon={<DeleteIcon></DeleteIcon>}
                    ></Action>
                  </>
                }
              />
            );
          })}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          Vous n’avez actuellement pas de module
        </p>
      )}
    </>
  );
};
