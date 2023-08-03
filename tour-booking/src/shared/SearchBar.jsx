import { Col, Form, FormGroup } from "reactstrap";
import "./SearchBar.scss";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { sweetAlertBasic } from "../helpers/sweetAlert";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  // search handler
  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (!location || !distance || !maxGroupSize) {
      return alert("All fields are required !");
    }

    await axios
      .get(
        `${BASE_URL}/tour/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
      )
      .then((res) => {
        navigate(
          `/tour/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
          {
            state: res.data,
          }
        );
      })
      .catch((err) => {
        console.log(err.message);
        sweetAlertBasic("Something went wrong");
      });
  };

  return (
    <>
      <Col lg="12">
        <div className="search__bar">
          <Form className="d-flex align-items-center gap-4">
            <FormGroup className="d-flex gap-3 form-group form-group-fast">
              <span>
                <i className="ri-map-pin-line"></i>
              </span>
              <div>
                <h6>Location</h6>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  ref={locationRef}
                />
              </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form-group form-group-fast">
              <span>
                <i className="ri-map-pin-time-line"></i>
              </span>
              <div>
                <h6>Distance</h6>
                <input
                  type="number"
                  placeholder="Distance k/m"
                  ref={distanceRef}
                />
              </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form-group form-group-last">
              <span>
                <i className="ri-group-line"></i>
              </span>
              <div>
                <h6>Max People</h6>
                <input type="number" placeholder="0" ref={maxGroupSizeRef} />
              </div>
            </FormGroup>

            <span className="search-icon" onClick={searchHandler}>
              <i className="ri-search-line"></i>
            </span>
          </Form>
        </div>
      </Col>
    </>
  );
};

export default SearchBar;
