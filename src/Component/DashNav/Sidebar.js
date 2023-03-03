import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { Link, NavLink } from "react-router-dom";

class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  render() {
    return (
      <>
        <SideNav expanded={this.state.isVisible}>
          <SideNav.Toggle
            onClick={() => {
              this.setState({ isVisible: !this.state.isVisible });
            }}
          />
          <SideNav.Nav defaultSelected="home">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to="/dashboard" className="nav">
                <NavItem eventKey="home" className="text-center">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-home"
                      style={{
                        fontSize: "1.75em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </NavIcon>
                  <NavText>Home</NavText>
                </NavItem>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to="/profile">
                <NavItem eventKey="myprofile">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-line-chart"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>

                  <NavText>My Profile</NavText>
                </NavItem>
              </Link>
            </div>
            <NavItem eventKey="progress">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>My Progress</NavText>
            </NavItem>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            <Link to="/bootcamps">
              <NavItem eventKey="bootcamps">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-line-chart"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText>Bootcamps</NavText>
              </NavItem>
            </Link>
            </div>
          </SideNav.Nav>
        </SideNav>
      </>
    );
  }
}

export default SideNavBar;
