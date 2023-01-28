import { useEffect } from "react";
import { useFitnessTrailApi } from "../../../shared/api/hooks/useFitnessTrailApi";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useGoals = () => {
  const user = useSelector((state) => state.connectedUser);
  const { call: getClassroom, isLoadingClassroom } = useFitnessTrailApi({
    endpoint: `items/studentclassroom?filter={"idStudent":{"_eq":"${user.id}"}}`,
    action: "get",
  });

  const [modules, setModules] = useState([]);

  const { call: callModules, isLoading } = useFitnessTrailApi({
    endpoint: ``,
    action: "get",
  });

  const getModules = (id) => {
    return callModules(
      "",
      "",
      `items/module?filter={ "idClassroom": { "_in": [${id}] }}`
    );
  };

  const { call: callGetGoals } = useFitnessTrailApi({
    endpoint: "",
    action: "get",
  });

  const getGoals = (id) => {
    return callGetGoals(
      "",
      "",
      `items/goal?filter={ "idModule": { "_in": [${id}] }}`
    );
  };

  async function fetchData() {
    const classroom = await getClassroom();
    console.log(classroom[0].idClassroom)
    const modules = await getModules(classroom[0].idClassroom);
    for (const module of modules) {
      const goals = await getGoals(module.id);
      module.goals = goals;
    }
    setModules(modules);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return { modules, isLoading, fetchData };
};


export const useStudentgoal = () => {
  const user = useSelector((state) => state.connectedUser);
  const [studentGoals, setStudentGoals] = useState([]);

  const { call: getStudent, isLoading } = useFitnessTrailApi({
    endpoint: `items/studentgoal?filter={ "idStudent": { "_in": ["${user.id}"] }}`,
    action: "get",
  });

  async function fetchData() {
    const studentGoal = await getStudent();
    setStudentGoals(studentGoal);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, studentGoals, isLoading };
};
