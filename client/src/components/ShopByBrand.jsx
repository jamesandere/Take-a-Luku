import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { shopByBrand } from "../data";

const ShopByBrand = () => {
  const navigate = useNavigate();

  return (
    <Container>
      {shopByBrand.map((item) => (
        <Card>
          <img src={item.img} alt={item.title} />
          <Details>
            <h2>{item.brand}</h2>
            <p>{item.style}</p>
            <button onClick={() => navigate("/brand/636245567c202f15b1e21478")}>
              Shop The Brand
            </button>
          </Details>
        </Card>
      ))}
    </Container>
  );
};

export default ShopByBrand;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 1rem 4rem;
`;

const Card = styled.div`
  flex: 1;
  margin: 0 10px;
  padding: 10px;

  img {
    width: 100%;
  }
`;

const Details = styled.div`
  text-align: center;

  h2 {
    text-transform: uppercase;
    font-weight: 900;
  }

  p {
    font-size: 17px;
    letter-spacing: 0.6px;
    line-height: 26px;
    padding: 2px 0 3px 0;
  }

  button {
    color: #000000;
    border-color: #000000;
    background: #ffffff;
    height: 60px;
    min-width: 184px;
    padding: 9px 14px;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    font-weight: 700;
    margin: 4px 0;
    cursor: pointer;
    transition: all ease 0.5s;

    &:hover {
      background-color: #000000;
      color: #ffffff;
    }
  }
`;
