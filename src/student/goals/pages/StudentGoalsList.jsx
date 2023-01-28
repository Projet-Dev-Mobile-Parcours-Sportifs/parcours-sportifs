import { useGoals,useStudentgoal } from "../hooks/useStudentGoals";
import CircularProgress from "@mui/material/CircularProgress";
import { Card } from "@mui/material";

export const StudentGoalsList = () => {
  const { modules, isLoading: isLoadingGoals, fetchData } = useGoals();


  const { fetchData : fetchStudentGoals, studentGoals: studentGoals } = useStudentgoal();
  const hasDatas = !isLoadingGoals && modules.length > 0;




  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Liste de vos goals
      </h1>
      {isLoadingGoals ? (
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
                            Pas de note
                          </p>
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
  );};





