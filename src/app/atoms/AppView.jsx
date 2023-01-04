import { useAuthenticationMiddleware } from "../../authentication/shared/hooks/useAuthenticationMiddleware"
import { Appbar } from "../../shared/components/molecules/Appbar/Appbar"
import { Routing } from "../../shared/router/Routing"

export const AppView = () => {
  useAuthenticationMiddleware()

  return (
    <>
      <Appbar role="professor" />
      <Routing />
      <div className="appbar_space"></div>
    </>
  )
}
