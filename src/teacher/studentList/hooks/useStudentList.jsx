import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { call } from "../../../shared/api/stores/api";
import { useFitnessTrailApi } from "../../../shared/api/hooks/useFitnessTrailApi";
import { useState } from "react";
export const useStudentList = {
  first_name: "Prénom",
  last_name: "Nom",
  email: "Mail",
};

export const useStudent = () => {
  const dispatch = useDispatch();

  const idClassroom = localStorage.getItem("classroom");
  const { call: getStudentClassroom } = useFitnessTrailApi({
    endpoint: `/items/studentclassroom?filter={ "idClassroom": { "_eq": "${idClassroom}" }}`,
    action: "get",
  });
  const [students, setStudents] = useState([]);

  async function fetchData() {
    const allStudentClassroom = await getStudentClassroom();

    const totalStudent = allStudentClassroom.length;
    let filterStudent = "[";
    setStudents(allStudentClassroom);
    allStudentClassroom.map(function (currentStudent, index) {
      filterStudent += `"${currentStudent.idStudent}"`;
      if (index != totalStudent - 1) {
        filterStudent += ",";
      }
    });
    filterStudent += "]";
    if (totalStudent > 0) {
      dispatch(
        call(
          `/users?filter={ "id": { "_in": ${filterStudent}}}`,
          [],
          "get",
          "",
          "students"
        )
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, students };
};
