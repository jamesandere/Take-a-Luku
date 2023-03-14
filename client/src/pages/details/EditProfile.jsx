import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { setHeaders, url } from "../../redux/api";

const EditProfile = () => {
  const [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${url}/users/profile`, setHeaders());
      setUser(res?.data);
    };

    fetchUser();
  }, []);

  return (
    <Container>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={user.firstName} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={user.lastName} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user.email} />
        </div>
        <div className="form-group">
          <label>Landmark</label>
          <input type="text" value={user.address?.landmark} />
        </div>
        <div className="form-group">
          <label>Postal Code</label>
          <input type="text" value={user.address?.postal_code} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" value={user.address?.city} />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input type="text" value={user.address?.country} />
        </div>
        <button>Save Details</button>
      </form>
    </Container>
  );
};

export default EditProfile;

const Container = styled.div`
  form {
    max-width: 400px;
    padding: 10px 14px;

    .form-group {
      display: flex;
      flex-direction: column;
      height: 60px;
      margin-bottom: 10px;

      input {
        height: 100%;
        outline: none;
        margin-top: 4px;
        padding: 4px;
      }
    }

    button {
      min-width: 160px;
      height: 40px;
      border-radius: 5px;
      padding: 10px 12px;
      font-size: 17px;
      letter-spacing: 1px;
      outline: none;
      border: none;
      cursor: pointer;
      background-color: #000000;
      color: white;
      margin-top: 6px;
    }
  }
`;
