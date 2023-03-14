import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const Join = () => {
  return (
    <Container>
      <Main>
        <div className="signin-options">
          <NavLink
            className={({ isActive }) => isActive && "link-active"}
            to="/join/signin"
          >
            <div>Sign In</div>
          </NavLink>
          <NavLink
            className={({ isActive }) => isActive && "link-active"}
            to="/join/register"
          >
            <div>Register</div>
          </NavLink>
        </div>
        <Outlet />
      </Main>
    </Container>
  );
};

export default Join;

const Container = styled.div`
  min-height: 90vh;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  background-color: #eee;
  padding: 2rem 0;

  .signin-options {
    padding: 25px 20px 15px;
    text-align: center;
    display: flex;

    a {
      width: 100%;
      padding: 10px;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 1.7;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      letter-spacing: 2px;
      line-height: 1.7;
      text-decoration: none;
      color: inherit;
      position: relative;

      &:nth-child(1)::after {
        content: " ";
        height: 22px;
        width: 2px;
        position: absolute;
        right: 0px;
        top: 10px;
        background: #2d2d2d;
        opacity: 0.1;
      }
    }

    .link-active {
      border-bottom: 2px solid #ddd;
    }
  }
`;

const Main = styled.div`
  background: #fff;
  min-height: 80vh;
  max-width: 650px;
  margin: 0 auto;
`;
