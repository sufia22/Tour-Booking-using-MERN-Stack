import "../styles/Home.scss";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";
import { Col, Container, Row } from "reactstrap";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/FeaturedTours/FeaturedTourList";
import MasonryImagesGallery from "../components/GalleryImage/MasonryImagesGallery";
import Testimonial from "../components/Testimonials/Testimonial";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* ------ hero section start ------ */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know before you go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Travelling opens the door to create{" "}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit deserunt quod accusamus, tempore illo vel quae
                  aspernatur maiores velit. Delectus sequi, praesentium iusto
                  voluptatum libero eveniet? Corrupti, minima assumenda?
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__imgbox">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__imgbox mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__imgbox mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ------ hero section end ------ */}

      {/* ------ service section start ------ */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="service-subtitle">What we serve</h5>
              <h2 className="service-title">We offer our best services</h2>
            </Col>

            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* ------ service section end ------ */}

      {/* ------ feature tour section start ------ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="feature-tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* ------ feature tour section end ------ */}

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

      {/* ------ gallery section start ------ */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery-title">
                Visit our customers tour gallery
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ------ gallery section end ------ */}

      {/* ------ testimonial section start ------ */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial-title">What our fans say about us</h2>
            </Col>
            <Col>
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ------ testimonial section end ------ */}

      {/* ------ newsletter section start ------ */}
      <Newsletter />
      {/* ------ newsletter section end ------ */}
    </>
  );
};

export default Home;
