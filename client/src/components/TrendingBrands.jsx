import styled from "styled-components";
import { trendingBrands } from "../data";

const TrendingBrands = () => {
  return (
    <Container>
      <h2>Trending Brands</h2>
      <ul>
        {trendingBrands.map((item) => (
          <li key={item.id}>
            <img src={item.img} alt="" />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TrendingBrands;

const Container = styled.div`
  min-height: 40vh;
  padding: 2rem 3.2rem;

  h2 {
    font-size: 24px;
    text-transform: uppercase;
    line-height: 30px;
    letter-spacing: 1.2px;
    text-align: center;
    margin-bottom: 2rem;
  }

  ul {
    list-style-type: none;
    display: flex;
  }

  ul li {
    margin: 8px;
    cursor: pointer;
  }

  ul li img {
    width: 90%;
  }
`;
