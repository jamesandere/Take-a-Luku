import styled from "styled-components";
import { menCats } from "../data";
import { MdOutlinePerson } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logOut } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleLogout = () => {
    dispatch(logOut());
  };

  const saveSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    navigate({
      pathname: "/search",
      search: `?q=${searchValue}`,
    });
    setSearchValue("");
  };

  return (
    <Container>
      <div className="main-nav">
        <Link to="/">
          <div className="logo">asos</div>
        </Link>
        <div className="categs">
          <span>Women</span>
          <span>Men</span>
        </div>
        <div className="search">
          {/* <label>Search for items and brands</label> */}
          <input
            type="text"
            value={searchValue}
            onChange={saveSearch}
            placeholder="Search for items and brands"
          />
          <button onClick={handleSearch}>
            <RiSearchLine />
          </button>
        </div>
        <div className="icons">
          <span className="user-icon">
            <MdOutlinePerson />
            <div className="user-dropdown">
              <div className="auth">
                <Link to="/join/signin">Sign in</Link>
                <Link to="/join/register">Register</Link>
              </div>
              <Link to="/admin">
                <span>Dashboard</span>
              </Link>
              <Link to="/profile">
                <span>Profile</span>
              </Link>
              <Link onClick={handleLogout}>
                <span>Logout</span>
              </Link>
            </div>
          </span>
          <Link to="/saved-list">
            <span>
              <AiOutlineHeart />
            </span>
          </Link>
          <Link to="/cart">
            <span>
              <BsBag />
            </span>
          </Link>
        </div>
      </div>
      <div className="nav-categ">
        {menCats.map((cat) => (
          <span>{cat}</span>
        ))}
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 4;
  .main-nav {
    background-color: #2d2d2d;
    height: 60px;
    padding: 0 3.2rem;
    display: flex;
    align-items: center;
    color: #fff;

    .logo {
      font-size: 30px;
      font-weight: 800;
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .categs {
      flex: 1;
      text-transform: uppercase;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0 10px;
    }

    .categs span {
      display: grid;
      align-items: center;
      text-align: center;
      height: 100%;
      flex: 1;

      &:nth-child(2) {
        background: #525050;
      }
    }

    .search {
      height: 40px;
      width: 500px;
      position: relative;
      border-radius: 40px;
      background: #fff;
      padding: 0 14px;
      flex: 3;

      button {
        position: absolute;
        top: 0;
        right: 0;
        background-color: transparent;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        cursor: pointer;
        color: #666;
        border: none;
        outline: none;
      }
    }

    .search input {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      background-color: transparent;
      padding: 0 10px;
      font-size: 14px;

      &::-webkit-input-placeholder {
        color: #666;
      }

      &::-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #666;
      }

      &::placeholder {
        color: #666;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: normal;
      }
    }

    .icons {
      display: flex;
      align-items: center;
      flex: 1;
      margin-left: 2rem;
    }

    .icons span {
      display: inline-block;
      font-size: 1.55rem;
      margin-right: 1rem;
    }

    .user-icon {
      position: relative;
      cursor: pointer;

      .user-dropdown {
        position: absolute;
        top: 30px;
        right: -20px;
        background-color: white;
        color: black;
        min-width: 180px;
        border-radius: 4px;
        padding: 8px 12px;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
          -13px -10px 15px -3px rgba(0, 0, 0, 0.1);
        display: none;

        a {
          text-decoration: none;
          color: #2d2d2d;

          span {
            display: block;
            margin: 8px 0;
            line-height: 24px;
            letter-spacing: 1px;
            font-size: 16px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 6px;
          }
        }

        .auth {
          color: #2d2d2d;
          display: flex;
          margin-bottom: 5px;

          a {
            font-size: 16px;
            margin-right: 4px;
            display: flex;
            align-items: center;
            height: 16px;
            /* padding: 1px 4px; */
            margin: 4px;
            /* background-color: pink; */

            &:nth-child(2) {
              border-left: 2px solid #666;
              padding-left: 4px;
            }
          }
        }
      }
    }

    .user-icon:hover .user-dropdown {
      display: block;
    }
  }

  .nav-categ {
    background: #525050;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    padding: 0 3.2rem;

    span {
      letter-spacing: 0.8px;
      line-height: 50px;

      &:nth-child(1),
      &:last-child {
        background: #d01345;
        font-weight: 800;
        padding: 0 12px 0 14px;
        -webkit-transform: skew(-12deg);
        transform: skew(-12deg);
      }
    }
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`;
