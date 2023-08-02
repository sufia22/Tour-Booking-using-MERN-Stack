import "../styles/Login.scss";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login-container d-flex justify-content-between">
              <div className="login-Img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login-form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleSubmit}>
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
                      Login
                    </Button>
                  </FormGroup>
                </Form>
                <p>
                  Don't you have an account?{" "}
                  <Link to={"/register"}>Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
