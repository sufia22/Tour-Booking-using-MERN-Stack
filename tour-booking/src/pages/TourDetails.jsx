import "../styles/TourDetails.scss";
import tourData from "../assets/data/tours";
import { useParams } from "react-router-dom";
import { Col, Container, Form, ListGroup, Row } from "reactstrap";
import avatar from "../assets/images/avatar.jpg";
import { useRef, useState } from "react";
import Booking from "../components/Booking/Booking";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef();
  const [tourRating, setTourRating] = useState(null);

  const tour = tourData.find((tour) => tour.id === id);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
  const avgRating =
    totalRating === 0
      ? ""
      : totalRating === 1
      ? totalRating
      : totalRating / reviews?.length;

  // format data
  const options = { day: "numeric", month: "long", year: "numeric" };

  // submit request to server
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    alert(`${reviewText}, ${tourRating}`);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour-content">
              <img src={photo} alt="" />

              <div className="tour-info">
                <h2>{title}</h2>

                <div className="d-flex align-items-center gap-5">
                  <span className="tour-rating d-flex align-items-center gap-1">
                    <i
                      className="ri-star-fill"
                      style={{ color: "var(--secondary-color)" }}
                    ></i>
                    {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                      "Not rated"
                    ) : (
                      <span>({reviews.length})</span>
                    )}
                  </span>

                  <span>
                    <i className="ri-map-pin-user-fill"></i>
                    {address}
                  </span>
                </div>

                <div className="tour-extra-details">
                  <span>
                    <i className="ri-map-pin-2-line"></i>
                    {city}
                  </span>

                  <span>
                    <i className="ri-money-dollar-circle-line"></i>${price} /per
                    person
                  </span>
                  <span>
                    <i className="ri-group-line"></i>
                    {distance} k/m
                  </span>
                  <span>
                    <i className="ri-group-line"></i>
                    {maxGroupSize} people
                  </span>
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>

              {/* tour reviews */}
              <div className="tour-reviews mt-4">
                <h4>Reviews({reviews?.length} reviews)</h4>

                <Form onSubmit={submitHandler}>
                  <div className="rating-group d-flex align-items-center gap-3 mb-4">
                    <span onClick={() => setTourRating(1)}>
                      1 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(2)}>
                      2 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(3)}>
                      3 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(4)}>
                      4 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(5)}>
                      5 <i className="ri-star-s-fill"></i>
                    </span>
                  </div>

                  <div className="review-input">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder="share your thoughts"
                      required
                    />
                    <button
                      className="btn primary__btn text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>

                <ListGroup className="user-reviews">
                  {reviews?.map((review) => (
                    <div className="review-item">
                      <img src={avatar} alt="" />

                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>Sufia</h5>
                            <p>
                              {new Date("01-08-2023").toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </p>
                          </div>
                          <span className="d-flex align-items-center">
                            5 <i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <h6>Amazing tour</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;
