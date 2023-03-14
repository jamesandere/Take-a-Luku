import styled from "styled-components";
import { seasons } from "../data";

const Seasons = () => {
  return (
    <Container>
      {seasons.map((item) => (
        <div className="season-card">
          <img src={item.img} alt={item.title} />
          <p className="season-card-title">{item.title}</p>
          <p>{item.desc}</p>
        </div>
      ))}
    </Container>
  );
};

export default Seasons;

const Container = styled.div`
  color: #000000;
  min-height: 60vh;
  display: flex;
  padding: 3.2rem;

  .season-card {
    /* width: 320px; */
    max-width: 100%;
    height: 450px;
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4px;
    margin: 0 10px;
    cursor: pointer;

    img {
      width: 100%;
    }

    p {
      font-size: 17px;
      flex: 1;
    }

    .season-card-title {
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 8px;
    }
  }
`;
