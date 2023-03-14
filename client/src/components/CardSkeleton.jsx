import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <Container className="card-skeleton">
        <div>
          <Skeleton height={390} style={{ marginBottom: ".6rem" }} />
        </div>
        <div>
          <Skeleton count={2} />
        </div>
        <div>
          <Skeleton width={50} style={{ marginTop: ".6rem" }} />
        </div>
      </Container>
    ));
};

export default CardSkeleton;

const Container = styled.div`
  padding: 4px 6px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  width: 100%;
`;
