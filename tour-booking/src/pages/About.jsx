import { Col, Container, Row } from "reactstrap";
import experienceImg from "../assets/images/experience.png";
import CommonSection from "../shared/CommonSection";
import Subtitle from "../shared/Subtitle";
import Newsletter from "../shared/Newsletter";

const About = () => {
  return (
    <>
      <CommonSection title={"About Us"} />
      {/* ------ experience section start ------ */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience-content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br /> we will serve you{" "}
                </h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  <br /> quod accusamus, tempore illo vel quae
                </p>
              </div>

              <div className="counter-wrapper d-flex align-items-center gap-5">
                <div className="counter-box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                </div>
                <div className="counter-box">
                  <span>2k+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter-box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience-img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ------ experience section end ------ */}

      {/* ------ newsletter section start ------- */}
      <Newsletter />
      {/* ------ newsletter section end ------- */}
    </>
  );
};

export default About;
