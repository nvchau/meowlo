import React from 'react'
import './AppBar.scss'
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import meowloLogo from 'resources/images/meowlo.png'

function AppBar() {
  return (
    <nav className="navbar-app">
      <BootstrapContainer className="meowlo-container">
        <Row>
          <Col sm={5} xs={12} className="col-no-padding">
            <div className="app-actions">
              <div className="item all"><i className="fa fa-th" /></div>
              <div className="item home"><i className="fa fa-home" /></div>
              <div className="item boards"><i className="fa fa-columns" />&nbsp;&nbsp;<strong>Boards</strong></div>
              <div className="item search">
                <InputGroup className="group-search">
                  <FormControl
                    className="input-search"
                    placeholder="Jump to..."
                  />
                  <InputGroup.Text className="input-icon-search"><i className="fa fa-search" /></InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          </Col>

          <Col sm={2} xs={12} className="col-no-padding">
            <div className="app-branding text-center">
              <a href="https://facebook.com/nvchau.dev" target="blank">
                <img src={meowloLogo} className="top-logo" alt="meowlo-logo" />
                <span className="meowlo-slogan">meowlo</span>
              </a>
            </div>
          </Col>

          <Col sm={5} xs={12} className="col-no-padding">
            <div className="user-actions">
              <div className="item quick"><i className="fa fa-plus-square-o" /></div>
              <div className="item news"><i className="fa fa-info-circle" /></div>
              <div className="item notification"><i className="fa fa-bell-o" /></div>
              <div className="item user-avatar">
                <img
                  src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/273532713_3809905752566906_8965370667488582217_n.jpg?_nc_cat=105&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=qlpiCqvmsNMAX8QvBcN&tn=3KwNw9SES2O4X2Tg&_nc_ht=scontent.fdad1-2.fna&oh=00_AT_p5j52VSfzmPJoWkaFg45UZz7YeVpBsA4TcMpG8OJrWQ&oe=62812D26"
                  alt="avatar-meowlo"
                  title="meowlo"
                />
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  )
}

export default AppBar
