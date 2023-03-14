import styled from "styled-components";
import { ralphLauren } from "../data";
import { Link } from "react-router-dom";
import {
  RiArrowDropDownLine,
  RiHeart3Line,
  RiHeart3Fill,
} from "react-icons/ri";
import { addToSavedList } from "../redux/savedItems";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CardSkeleton from "./CardSkeleton";

const Products = ({ products, isLoading }) => {
  const dispatch = useDispatch();

  const hanldeAddToSavedList = (item) => {
    dispatch(addToSavedList(item));
  };

  return (
    <Main>
      {isLoading && <CardSkeleton cards={8} />}
      {products?.map((item) => (
        <Card>
          <Link to={`/product/${item._id}`}>
            <img src={item?.images[0]?.url} alt={item.title} />
          </Link>
          <h2>{item.title}</h2>
          <span>£{item.price.toFixed(2)}</span>
          <button onClick={() => hanldeAddToSavedList(item)}>
            <span>
              <RiHeart3Line />
            </span>
          </button>
          <div className="discount-banner">-16%</div>
        </Card>
      ))}
    </Main>
  );
};

export default Products;

const Main = styled.div`
  min-height: 100vh;
  padding: 1.8rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 6px;

  a {
    text-decoration: none;
  }
`;

const Card = styled.div`
  padding: 4px 6px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    min-height: 390px;
    object-fit: contain;
  }

  h2 {
    color: #2d2d2d;
    display: block;
    font-size: 14px;
    letter-spacing: 0.5px;
    line-height: 20px;
    margin: 6px 0;
    min-height: 44px;
    font-weight: 400;
  }

  span {
    color: #666;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.8px;
    line-height: 20px;
  }

  button {
    background-color: hsla(0, 0%, 100%, 0.8);
    border: none;
    border-radius: 50%;
    color: #2d2d2d;
    cursor: default;
    height: 36px;
    margin-top: calc(127.7778% - 56px);
    outline: none;
    padding: 10px 8px 8px;
    position: absolute;
    right: 10px;
    top: 0;
    width: 36px;
    cursor: pointer;
    z-index: 2;

    span {
      font-size: 18px;
    }
  }

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
`;
