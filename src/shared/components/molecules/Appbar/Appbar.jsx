import { useState } from "react"
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import PropTypes from "prop-types"
import { AccountCircle, Diversity3, FitnessCenter } from "@mui/icons-material"
import { StyledAppbar } from "./styles"
import { useLocation, useNavigate } from "react-router-dom"
import { useRoles } from "../../../../authentication/shared/hooks/useRoles"

export const Appbar = () => {
  let linkNav = []
  const location = useLocation()
  const [link, setLink] = useState(location.pathname.substring(1))
  const navigate = useNavigate()
  const { role } = useRoles()

  if (role === "professor") {
    linkNav = [
      {
        key: 1,
        value: "students",
        label: "Students",
        navigation: "teacher/student/list",
        icon: <Diversity3 />,
      },
      {
        key: 3,
        value: "modules",
        label: "Modules",
        navigation: "teacher/modules/list",
        icon: <FitnessCenter />,
      },
      {
        key: 4,
        value: "account",
        label: "Account",
        navigation: "account",
        icon: <AccountCircle />,
      },
    ]
  }

  if (role === "student") {
    linkNav = [
      {
        key: 2,
        value: "modules",
        label: "Modules",
        navigation: "student/modules",
        icon: <FitnessCenter />,
      },
      {
        key: 3,
        value: "account",
        label: "Account",
        navigation: "account",
        icon: <AccountCircle />,
      },
    ]
  }

  return (
    <StyledAppbar>
      <div className="App">Parcours Sportifs</div>
      <BottomNavigation
        value={link}
        onChange={(event, newLink) => {
          setLink(newLink)
        }}
      >
        {linkNav.map((x) => (
          <BottomNavigationAction
            onClick={() => navigate("/" + x.navigation)}
            {...x}
          />
        ))}
      </BottomNavigation>
    </StyledAppbar>
  )
}

Appbar.propTypes = {
  /**
   * Which nale
   */
  role: PropTypes.string,
}
