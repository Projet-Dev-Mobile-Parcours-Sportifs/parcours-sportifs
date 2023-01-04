import { useAuthenticationMiddleware } from "../../authentication/shared/hooks/useAuthenticationMiddleware"
import { useIsConnected } from "../../authentication/shared/hooks/useIsConnected"
import { Appbar } from "../../shared/components/molecules/Appbar/Appbar"
import { Routing } from "../../shared/router/Routing"
import { useModule } from "../../teacher/moduleList/hooks/useModuleList"
import { useStudent } from "../../teacher/studentList/hooks/useStudentList"
import { useRefreshConnectedUser } from "../../authentication/login/hooks/useRefreshConnectedUser"

export const AppView = () => {
  const { isConnected } = useIsConnected()
  useAuthenticationMiddleware()
  useRefreshConnectedUser();
  useStudent();
  useModule();

  return (
    <>
      {isConnected ? <Appbar /> : null}
      <Routing />
      <div className="appbar_space"></div>
    </>
  )
}
