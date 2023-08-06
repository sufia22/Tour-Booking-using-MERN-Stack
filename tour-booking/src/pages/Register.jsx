import "../styles/Login.scss";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${BASE_URL}/auth/register`, credentials)
        .then((res) => {
          dispatch({ type: "REGISTER_SUCCESS" });
          navigate("/login");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login-container d-flex justify-content-between">
              <div className="login-Img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login-form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      type="submit"
                      className="btn secondary__btn auth-btn"
                    >
                      Create Account
                    </Button>
                  </FormGroup>
                </Form>
                <p>
                  Already have an account? <Link to={"/login"}>Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
