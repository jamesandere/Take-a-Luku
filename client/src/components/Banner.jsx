import styled from "styled-components";

const Banner = () => {
  return (
    <StyledBanner>
      <button>Women</button>
      <span>
        SALE: EXTRA 25% OFF ALL STYLES!* UP TO 80% OFF ALREADY With code:
        SALETIME
      </span>
      <button>Men</button>
    </StyledBanner>
  );
};

export default Banner;

const StyledBanner = styled.div`
  background: #ee98ba;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3.2rem;

  button {
    border: 2.3px solid black;
    background-color: transparent;
    width: 100px;
    padding: 4px 6px;
    text-transform: uppercase;
    line-height: 15px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
  }

  span {
    text-align: center;
    font-weight: 700;
    letter-spacing: 2px;
  }
`;
