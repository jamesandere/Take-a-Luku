import styled from "styled-components";

const MyOrders = () => {
  return (
    <Container>
      <h2>My Orders</h2>
      <Headers>
        <h3>ID</h3>
        <h3>Status</h3>
        <h3>Amount</h3>
        <h3>Ordered on:</h3>
      </Headers>
      <Orders>
        <p>1893296209327327</p>
        <p>Pending</p>
        <p>14,830</p>
        <p>4th Sep 2022</p>
      </Orders>
    </Container>
  );
};

export default MyOrders;

const Container = styled.div`
  h2 {
    margin-bottom: 20px;
  }
`;

const Headers = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  column-gap: 0.5rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
`;

const Orders = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  column-gap: 0.5rem;
  padding-top: 0.5rem;
`;
