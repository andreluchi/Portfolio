import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import calc from "../assets/img/calculadora.png";
import pokemon from "../assets/img/pokememoria.png";
import wordle from "../assets/img/wordle.png";
import libros from "../assets/img/Books.png";
import historia from "../assets/img/historia.png";
import squirtle from "../assets/img/squirtle.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Calculator",
      description: "A simpe calculator",
      imgUrl: calc,
    },
    {
      title: "Pokemon memory game",
      description: "A memory game with pokemon cards",
      imgUrl: pokemon,
    },
    {
      title: "Wordle Clone",
      description: "A clone of the popular game Wordle",
      imgUrl: wordle,
    },
    {
      title: "Book store",
      description: "A book store made with only html and css",
      imgUrl: libros,
    },
    {
      title: "The history of my grandfather",
      description: "Made with only html",
      imgUrl: historia,
    },
    {
      title: "Squirtle image",
      description: "A simple squirtle image made with only html and css",
      imgUrl: squirtle,
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>These are some of the projects I made during the class.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                      <p></p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p></p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
