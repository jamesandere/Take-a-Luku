import styled from "styled-components";
import HeaderImages from "./HeaderImages";

const Header = () => {
  return (
    <StyledHeader>
      <span className="">Sale</span>
      <p className="sale-desc">
        EXTRA 25% OFF ALL STYLES!
        <br /> UP TO 80% OFF ALREADY <br /> <span>With code: SALETIME</span>
      </p>
      <HeaderImages />
      <button>View All</button>
      <p>
        Sale items only. See website banner for Ts&amp;Cs. Selected marked
        products excluded from promo.
      </p>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  min-height: calc(100vh - 160px);
  height: auto;
  background: rgb(245, 237, 220);
  background: linear-gradient(
    90deg,
    rgba(245, 237, 220, 1) 6%,
    rgba(207, 210, 207, 1) 91%
  );
  padding: 1.2rem 3.2rem;
  display: flex;
  flex-direction: column;

  span {
    &:first-child {
      display: inline-block;
      text-align: center;
      background: #fff;
      width: 200px;
      border-radius: 50px;
      padding: 8px 16px;
      font-size: 22px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
      margin: 14px auto;
    }
  }

  p {
    text-align: center;

    &:last-child {
      font-weight: 700;
    }
  }

  .sale-desc {
    text-align: center;
    font-size: 48px;
    line-height: 64px;
    font-weight: 900;
    margin: 10px 0;

    span {
      font-size: 20px;
      font-weight: 700;
    }
  }

  button {
    background-color: #fff;
    color: black;
    width: 160px;
    margin: 2rem auto;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 1px;
    border: none;
    outline: none;
    padding: 12px 10px;
    cursor: pointer;
  }
`;
