import { useStudent, useGoals, useStudentgoal } from "../hooks/useStudentGoals";

import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { Action } from "../../shared/components/atoms/Action/Action";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFitnessTrailApi } from "../../shared/api/hooks/useFitnessTrailApi";

export const ShowStudentGoal = () => {
  const { studentDetail: studentDetail } = useStudent();
  const {
    modules: modules,
    isLoading,
    fetchData: fetchDataModule,
  } = useGoals();
  const { fetchData, studentGoals: studentGoals } = useStudentgoal();
  const hasDatas = !isLoading && modules.length > 0;

  const { call: callDelete } = useFitnessTrailApi({
    endpoint: "",
    action: "delete",
  });
  const deleteGoalStudent = async (id) => {
    await callDelete("", "", `/items/studentgoal/${id}`);
    fetchData();
    fetchDataModule();
  };

  const navigate = useNavigate();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Goals de {studentDetail.first_name} {studentDetail.last_name}
      </h1>
      {isLoading ? (
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
          {modules.map(function (module) {
            return (
              <Card
                sx={{ minWidth: 300 }}
                style={{ padding: "15px", margin: "15px" }}
              >
                <h5 style={{ textAlign: "center" }}>{module.name}</h5>
                {module.goals.map(function (goal) {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>{goal.name}</p>
                      {studentGoals.map(function (studentGoal) {
                        if (studentGoal.idGoal == goal.id) {
                          goal.studentGoal = studentGoal;
                        }
                      })}
                      {goal.studentGoal ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ marginRight: "15px" }}>
                            <p>Note : {goal.studentGoal.level}</p>
                            <p>Commentaire : {goal.studentGoal.comments}</p>
                          </div>
                          <Action
                            action={() =>
                              navigate(`/teacher/student/${studentDetail.id}/${goal.studentGoal.id}/modify`)
                            }
                            icon={<CreateIcon></CreateIcon>}
                          ></Action>
                          <Action
                            action={() =>
                              deleteGoalStudent(goal.studentGoal.id)
                            }
                            icon={<DeleteIcon></DeleteIcon>}
                          ></Action>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p style={{ marginRight: "15px" }}>
                            Ajouter une note
                          </p>
                          <Action
                            action={() =>
                              navigate(
                                `/teacher/student/${studentDetail.id}/goal/${goal.id}/student-goal/create`
                              )
                            }
                            icon={<AddIcon></AddIcon>}
                          ></Action>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Card>
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
