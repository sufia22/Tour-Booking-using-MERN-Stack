import "../styles/TourDetails.scss";
import { useParams } from "react-router-dom";
import { Col, Container, Form, ListGroup, Row } from "reactstrap";
import avatar from "../assets/images/avatar.jpg";
import { useContext, useRef, useState } from "react";
import Booking from "../components/Booking/Booking";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import swal from "sweetalert";
import axios from "axios";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef();
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour } = useFetch(`${BASE_URL}/tour/${id}`);

  // Make sure tour.tour is not null or undefined
  if (!tour || !tour.tour) {
    return <div>No tour data available.</div>;
  }

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
  } = tour.tour;

  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
  const avgRating =
    totalRating === 0
      ? ""
      : totalRating === 1
      ? totalRating
      : totalRating / reviews?.length;

  // format data
  const options = { month: "long", day: "numeric", year: "numeric" };

  // submit request to server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user || user === undefined || user === null) {
      swal("Please sign in");
    } else {
      const reviewObject = {
        username: user?.user?.username,
        reviewText,
        rating: tourRating,
      };

      try {
        const reviewObject = {
          username: user?.user?.username,
          reviewText,
          rating: tourRating,
        };

        const response = await axios
          .post(`http://localhost:5050/api/v1/review/${id}`, reviewObject)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });

        // await axios
        //   .get(`${BASE_URL}/tour/`)
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [tour.tour]);

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
                  {reviews?.map((review, index) => {
                    return (
                      <div className="review-item" key={index}>
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating} <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    );
                  })}
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
