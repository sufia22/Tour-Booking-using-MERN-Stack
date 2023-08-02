import "./Newsletter.scss";
import maleTourist from "../assets/images/male-tourist.png";
import { Col, Container, Row } from "reactstrap";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter-content">
              <h2>Subscribe now to get useful traveling information</h2>

              <div className="newsletter-input">
                <input type="text" placeholder="Enter your email" />
                <button className="btn newsletter-btn">Subscribe</button>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis distinctio deleniti nobis sapiente pariatur velit.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter-img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
