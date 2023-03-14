import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { setHeaders, url } from "../../redux/api";

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${url}/users/profile`, setHeaders());
        setUser(res?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <Container>
      <section>
        <div className="user-wrapper">
          <div className="personal-deets">
            <h3>Personal Details</h3>
            <p>
              <span>First Name: </span>
              {user.firstName}
            </p>
            <p>
              <span>Last Name: </span>
              {user.lastName}
            </p>
            <p>
              <span>Email: </span>
              {user.email}
            </p>
          </div>
          <div className="shipping-details">
            <h3>Shipping Details</h3>
            <p>
              <span>Landmark: </span>
              {user.address?.landmark}
            </p>
            <p>
              <span>Postal Code: </span>
              {user.address?.postal_code}
            </p>
            <p>
              <span>City: </span>
              {user.address?.city}
            </p>
            <p>
              <span>Country: </span>
              {user.address?.country}
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 110px);
  section {
    width: 100%;

    .user-wrapper {
      width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

      .shipping-details {
        margin-top: 20px;
      }

      .personal-deets,
      .shipping-details h3 {
        margin-bottom: 6px;
      }
    }
  }

  p > span {
    font-size: 15px;
    font-weight: bold;
  }
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
`;
