import { useEffect, useState } from "react";
import styled from "styled-components";
import SocialButtons from "./SocialButtons";
import { StyledForm } from "./StyledForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice";

const Register = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Take A Luku | Register ";

    if (auth.token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(user));
  };

  return (
    <Container>
      <SocialButtons heading="SIGN UP WITH..." />
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="">First Name</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <label htmlFor="">Last Name</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <label htmlFor="">Email Address</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>Register</button>
      </StyledForm>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  padding-bottom: 14px;
`;
