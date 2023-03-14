import styled from "styled-components";

const HeaderCard = ({ item }) => {
  return (
    <StyledCard>
      <img src={item.img} />
      <span>{item.title}</span>
    </StyledCard>
  );
};

export default HeaderCard;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 270px;
  width: 180px;
  /* margin: 1rem auto; */

  img {
    /* height: 100%;
    width: 100%; */
    flex: 2;
  }

  span {
    background-color: white;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-transform: uppercase;
    font-weight: 700;
  }
`;
