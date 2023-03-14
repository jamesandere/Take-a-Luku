import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromSavedList } from "../redux/savedItems";
import { addToCart } from "../redux/cartSlice";
import Socials from "../components/Socials";
import Footer from "../components/Footer";

const SavedList = () => {
  const { items } = useSelector((state) => state.savedItems);
  const dispatch = useDispatch();
  const [size, setSize] = useState("");

  useEffect(() => {
    document.title = "Saved Items | Take A Luku";
  }, [dispatch, items]);

  const handleRemoveFromSavedList = (item) => {
    dispatch(deleteFromSavedList(item));
  };

  const handleMoveToBag = (item) => {
    dispatch(addToCart({ ...item, size }));
    handleRemoveFromSavedList(item);
  };

  return (
    <>
      <Container>
        <h1>Saved Items</h1>
        <Wrapper>
          <div className="saved-select">
            <select>
              <option value="">Recently Added</option>
              <option value="">Expiring soonest</option>
              <option value="">Recently discounted</option>
              <option value="">% discount</option>
              <option value="">Price: high to low</option>
              <option value="">Price: low to high</option>
              <option value="">Brand A-Z</option>
              <option value="">Stock level</option>
            </select>
          </div>
          <div className="saved-items">
            {items?.map((item) => (
              <Card>
                <Link to={`/product/${item._id}`}>
                  <img src={item.images[0]?.url} alt="" />
                </Link>
                <p>{item.title}</p>
                <Price>
                  <span>£{item.price}</span>
                  <span>£93.00</span>
                </Price>
                <div className="colour-select">{item.color}</div>
                <div className="size-select">
                  <select onChange={(e) => setSize(e.target.value)}>
                    {item.size?.map((size, i) => (
                      <option value={size} key={i}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={() => handleMoveToBag(item)}>
                  Move To Bag
                </button>
                {item.discount > 0 && (
                  <div className="discount-banner">-16%</div>
                )}
                <button
                  onClick={() => handleRemoveFromSavedList(item)}
                  className="delete-saved"
                >
                  <HiOutlineTrash />
                </button>
              </Card>
            ))}
          </div>
        </Wrapper>
      </Container>
      <Socials />
      <Footer />
    </>
  );
};

export default SavedList;

const Container = styled.div`
  background: #eeeeee;

  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    padding: 24px 0;
    letter-spacing: 1.2px;
    line-height: 30px;
  }
`;

const Wrapper = styled.div`
  background: #fff;
  padding: 10px 32px;

  .saved-select {
    width: 200px;
    cursor: pointer;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.6px;
    select {
      width: 100%;
      padding: 6px 0px;
      background: #fff;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
      border: none;
      outline: none;
    }
  }

  .saved-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px 20px;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

const Card = styled.div`
  max-width: 316px;
  margin: 12px 0 28px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  cursor: pointer;

  .discount-banner {
    position: absolute;
    top: 16px;
    background: hsla(0, 0%, 100%, 0.8);
    color: #d01345;
    font-size: 12px;
    letter-spacing: 0.8px;
    line-height: 16px;
    padding: 2px 4px;
  }

  .delete-saved {
    width: 36px;
    height: 36px;
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: hsla(0, 0%, 100%, 0.8);
    border: none;
    outline: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    z-index: 2;
  }

  img {
    width: 100%;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }

  .colour-select,
  .size-select {
    height: 44px;
    background: #fff;
    border-top: 1px solid #ddd;
    letter-spacing: 0.6px;
    line-height: 20px;

    select {
      border: none;
      width: 100%;
      height: 100%;
      outline: none;
    }
  }

  .colour-select {
    display: flex;
    align-items: center;
    color: rgb(170, 170, 170);
  }

  button {
    background: transparent;
    border: 2px solid #018849;
    box-sizing: border-box;
    color: inherit;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.8px;
    line-height: 20px;
    padding: 4px 0;
    text-transform: uppercase;
    width: 100%;
  }
`;

const Price = styled.div`
  margin-bottom: 10px;
  span:nth-child(1) {
    margin-right: 10px;
  }
`;
