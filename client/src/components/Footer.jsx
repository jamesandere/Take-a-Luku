import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <div className="footer-list">
        <h4>Help & Information</h4>
        <ul>
          <li>Help</li>
          <li>Track order</li>
          <li>Delivery & returns</li>
        </ul>
      </div>
      <div className="footer-list">
        <h4>ABOUT ASOS</h4>
        <ul>
          <li>About Us</li>
          <li>Careers at ASOS</li>
          <li>Corporate responsibility</li>
          <li>Investor's site</li>
        </ul>
      </div>
      <div className="footer-list">
        <h4>More from Asos</h4>
        <ul>
          <li>Mobile and ASOS apps</li>
          <li>ASOS Marketplace</li>
          <li>Gift vouchers</li>
          <li>Black Friday</li>
          <li>ASOS x Thrift+</li>
        </ul>
      </div>
      <div className="footer-list">
        <h4>SHOPPING FROM:</h4>
        <div className="change-country">
          <div>
            You're in
            <img
              src="https://assets.asosservices.com/storesa/images/flags/ke.png"
              alt="KE"
            />
          </div>
          <div>CHANGE</div>
        </div>
      </div>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  min-height: 40vh;
  background: #eeeeee;

  display: flex;
  justify-content: space-between;
  padding: 2rem 3.2rem;
  color: #666;

  .footer-list h4 {
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 900;
    line-height: 44px;
  }

  .footer-list ul {
    list-style-type: none;
  }

  .footer-list li {
    line-height: 30px;
    font-size: 0.875rem;
  }

  .change-country {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .change-country img {
    height: 20px;
    width: 20px;
    margin-left: 6px;
  }

  .change-country div {
    display: flex;
    align-items: center;
  }
`;
