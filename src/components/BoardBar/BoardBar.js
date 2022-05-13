import React from 'react'
import './BoardBar.scss'
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap'

function BoardBar() {
  return (
    <nav className="navbar-board">
      <BootstrapContainer className="meowlo-container">
        <Row>
          <Col sm={10} xs={12} className="col-no-padding">
            <div className="board-info">
              <div className="item board-logo-icon"><i className="fa fa-coffee" />&nbsp;&nbsp;<strong>Meowlo</strong></div>
              <div className="divider"></div>
              <div className="item board-type">Private Workspace</div>
              <div className="divider"></div>
              <div className="item member-avatar">
                <img src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/273532713_3809905752566906_8965370667488582217_n.jpg?_nc_cat=105&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=qlpiCqvmsNMAX8QvBcN&tn=3KwNw9SES2O4X2Tg&_nc_ht=scontent.fdad1-2.fna&oh=00_AT_p5j52VSfzmPJoWkaFg45UZz7YeVpBsA4TcMpG8OJrWQ&oe=62812D26"
                  alt="avatar-meowlo" title="meowlo" />
                <img src="https://i.redd.it/yvgjy6tiz5l01.jpg"
                  alt="avatar-meowlo" title="meowlo" />
                <img src="https://res.cloudinary.com/twenty20/private_images/t_standard-fit/photosp/9c79a099-45fb-47b4-aa27-fed71df3b07a/stock-photo-small-cat-beautiful-cat-blue-eyes-love-white-and-black-red-cat-hd-9c79a099-45fb-47b4-aa27-fed71df3b07a.jpg"
                  alt="avatar-meowlo" title="meowlo" />
                <img src="https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg"
                  alt="avatar-meowlo" title="meowlo" />
                <img src="https://i.pinimg.com/originals/47/72/57/477257967192f3c7f94c8f3131a68fc9.jpg"
                  alt="avatar-meowlo" title="meowlo" />
                <span className="more-members">+7</span>
                <span className="invite">Invite</span>
              </div>
            </div>
          </Col>

          <Col sm={2} xs={12} className="col-no-padding">
            <div className="board-actions">
              <div className="item menu"><i className=" fa fa-ellipsis-h mr-2" />Show menu</div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  )
}

export default BoardBar
