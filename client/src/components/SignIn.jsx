import { useEffect, useState } from "react";
import styled from "styled-components";
import SocialButtons from "./SocialButtons";
import { StyledForm } from "./StyledForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../redux/authSlice";

const SignIn = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Take A Luku | Sign in ";
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="">Email Address</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button>Sign In</button>
      </StyledForm>
      <SocialButtons />
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  padding-bottom: 10px;
`;
