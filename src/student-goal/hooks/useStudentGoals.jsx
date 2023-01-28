import { useEffect } from "react";
import { useFitnessTrailApi } from "../../shared/api/hooks/useFitnessTrailApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const useStudent = () => {
  const { studentId } = useParams();
  const [studentDetail, setStudentDetail] = useState([]);

  const { call: getStudent, isLoading } = useFitnessTrailApi({
    endpoint: `users/${studentId}`,
    action: "get",
  });
  useEffect(() => {
    async function fetchData() {
      const studentDetail = await getStudent();
      setStudentDetail(studentDetail);
    }
    fetchData();
  }, []);
  return { studentDetail, isLoading };
};

export const useGoals = () => {
  const [modules, setModules] = useState([]);

  const idClassroom = localStorage.getItem("classroom");

  const { call: getModules, isLoading } = useFitnessTrailApi({
    endpoint: `items/module?filter={ "idClassroom": { "_in": [${idClassroom}] }}`,
    action: "get",
  });

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
    const modules = await getModules();

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
  const { studentId } = useParams();
  const [studentGoals, setStudentGoals] = useState([]);

  const { call: getStudent, isLoading } = useFitnessTrailApi({
    endpoint: `items/studentgoal?filter={ "idStudent": { "_in": ["${studentId}"] }}`,
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
