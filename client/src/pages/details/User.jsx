import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import { setHeaders, url } from "../../redux/api";

const User = () => {
  return (
    <Container>
      <SideNav>
        <NavLink to="/profile">My Profile</NavLink>
        <NavLink to="/profile/edit">Edit Profile</NavLink>
        <NavLink to="/profile/my-orders">My Orders</NavLink>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default User;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
  position: fixed;
  width: 300px;
  height: calc(100vh - 110px);
  overflow-y: auto;
  padding: 2rem;

  a {
    text-decoration: none;
    line-height: 24px;
    margin-bottom: 4px;
    padding: 4px 6px;
    color: inherit;
    border-bottom: 1px solid #ddd;

    &:last-child {
      border: none;
    }
  }
`;

const Content = styled.div`
  margin-left: 300px;
  padding: 2rem 3rem;
  width: 100%;
`;
