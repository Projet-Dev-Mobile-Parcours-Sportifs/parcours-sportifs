import { useAuthenticationMiddleware } from "../../authentication/shared/hooks/useAuthenticationMiddleware"
import { Appbar } from "../../shared/components/molecules/Appbar/Appbar"
import { Routing } from "../../shared/router/Routing"
import { useModule } from "../../teacher/moduleList/hooks/useModuleList"
import { useStudent } from "../../teacher/studentList/hooks/useStudentList"
import { useRefreshConnectedUser } from "../../authentication/login/hooks/useRefreshConnectedUser"

export const AppView = () => {
  useAuthenticationMiddleware()
  useRefreshConnectedUser();
  useStudent();
  useModule();

  return (
    <>
      <Appbar role="professor" />
      <Routing />
      <div className="appbar_space"></div>
    </>
  )
}
