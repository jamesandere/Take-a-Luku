import styled from "styled-components";
import { GrFacebook, GrInstagram, GrSnapchat } from "react-icons/gr";

const Socials = () => {
  return (
    <Container>
      <ul>
        <li>
          <GrFacebook />
        </li>
        <li>
          <GrInstagram />
        </li>
        <li>
          <GrSnapchat />
        </li>
      </ul>
      <ul class="_2S9UgOW">
        <li class="_3cqbUhI">
          <img
            src="https://images.asos-media.com/navigation/visa-png"
            alt="VISA"
          />
        </li>
        <li class="_3cqbUhI">
          <img
            src="https://images.asos-media.com/navigation/mastercard-png"
            alt="Mastercard"
          />
        </li>
        <li class="_3cqbUhI">
          <img
            src="https://images.asos-media.com/navigation/pay-pal-png"
            alt="PayPal"
          />
        </li>
        <li class="_3cqbUhI">
          <img
            src="https://images.asos-media.com/navigation/american-express-png"
            alt="American Express"
          />
        </li>
        <li class="_3cqbUhI">
          <img
            src="https://images.asos-media.com/navigation/visa-electron-png"
            alt="VISA Electron"
          />
        </li>
      </ul>
    </Container>
  );
};

export default Socials;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #eee;
  margin-top: 30px;

  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    border-left: 1px solid #999;
    margin: 20px 0 20px 50px;
    padding: 0 0 0 50px;
    height: 20px;

    &:first-child {
      border: none;
      margin-right: 10px;

      li {
        margin: 0 1.6rem;
        font-size: 20px;
        cursor: pointer;
      }
    }

    li img {
      height: 20px;
      margin: 10px;
    }
  }
`;
