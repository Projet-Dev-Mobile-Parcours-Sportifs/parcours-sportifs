import { Route, Routes } from "react-router-dom"
import { Account } from "../../account/pages/Account"
import { Login } from "../../authentication/login/pages/Login"
import { Register } from "../../authentication/register/pages/Register"
import { CreateStudentGoal } from "../../student-goal/pages/CreateStudentGoal"
import { ModifyStudentGoal } from "../../student-goal/pages/ModifyStudentGoal"
import { StudentList } from "../../teacher/studentList/pages/StudentList"
import { ModuleList } from "../../teacher/moduleList/pages/ModuleList"
import { CreateModule } from "../../modules/pages/CreateModule"
import { ModifyModule } from "../../modules/pages/ModifyModule"
import { CreateGoal } from "../../goals/pages/CreateGoal"
import { ModifyGoal } from "../../goals/pages/ModifyGoal"
import {AddStudentToProfessor} from "../../teacher/add-student/pages/AddStudentToProfessor"
import { ModuleDetails } from "../../teacher/moduleDetail/pages/ModuleDetails"
import {ShowStudentGoal} from '../../student-goal/pages/showStudentGoal'
import { StudentGoalsList } from "../../student/goals/pages/StudentGoalsList"
export const Routing = () => {
    return (
        <Routes>
            <Route index path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/:roleName" element={<Register />} />

            <Route path="/teacher/student/list" element={<StudentList />} />
            <Route path="/teacher/modules/list" element={<ModuleList />} />

            <Route path="/teacher/student/:studentId/goal/:goalId/student-goal/create" element={<CreateStudentGoal />} />
            <Route path="/teacher/student/:studentId/:goalId/modify" element={<ModifyStudentGoal />} />

            <Route path="teacher/classroom/:classroomId/modules/create" element={<CreateModule />} />
            <Route path="teacher/module/:moduleId/modify" element={<ModifyModule />} />

            <Route path="teacher/module/:moduleId/goal/create" element={<CreateGoal />} />
            <Route path="teacher/module/:moduleId/goal/:goalId/modify" element={<ModifyGoal />} />

            <Route path="teacher/module/:moduleId" element={<ModuleDetails />} />

            <Route path="teacher/student/create" element={<AddStudentToProfessor/>}/>
            <Route path="teacher/student/:studentId/goals" element={<ShowStudentGoal/>}/>
            <Route path="student/modules" element={<StudentGoalsList/>}/>

        </Routes>
    )
}
