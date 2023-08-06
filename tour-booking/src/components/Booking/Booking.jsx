import { Button, Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Booking.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import swal from "sweetalert";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour.tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userID: user?.user?._id,
    userEmail: user?.user?.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  // handle input change
  const handleChange = async (e) => {
    setBooking((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(booking);

    try {
      if (!user || user === undefined || user === null) {
        swal("Please sign in");
      }

      await axios
        .post(`${BASE_URL}/booking`, booking)
        .then((res) => {
          navigate("/thank-you");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking-top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour-rating d-flex align-items-center">
          <i
            className="ri-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ------ booking form start ------ */}
      <div className="booking-form">
        <h5>Information</h5>
        <Form className="booking-info-form" onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* ------ booking form end ------ */}

      {/* ------ booking bottom ------ */}
      <div className="booking-bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleSubmit}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
