import styled from "styled-components";
import { headerImages } from "../data";
import HeaderCard from "./HeaderCard";

const HeaderImages = () => {
  return (
    <Container>
      {headerImages.map((item) => (
        <HeaderCard item={item} />
      ))}
    </Container>
  );
};

export default HeaderImages;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 0 3rem;
`;
