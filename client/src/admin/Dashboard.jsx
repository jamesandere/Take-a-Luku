import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { FaUsers, FaStore, FaClipboard, FaTachometerAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <StyledDashboard>
      <SideNav>
        <h3>Quick Links</h3>
        <h3>Profile</h3>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/profile"
        >
          <FaUsers /> My Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
          <FaClipboard /> Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
          <FaClipboard /> My Orders
        </NavLink>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  min-height: 100vh;
`;

const SideNav = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
  position: fixed;
  width: 200px;
  height: calc(100vh - 110px);
  overflow-y: auto;
  padding: 2rem;
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;
