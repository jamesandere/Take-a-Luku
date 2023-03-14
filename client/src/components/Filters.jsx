import styled from "styled-components";
import { filters } from "../data";
import {
  RiArrowDropDownLine,
  RiHeart3Line,
  RiHeart3Fill,
} from "react-icons/ri";

const Filters = () => {
  return (
    <Container>
      <ul>
        {filters.map((item) => (
          <div className="filter-box">
            <li className="filter-title">{item.name}</li>
            <ul className="hide">
              {item.list.map((list) => (
                <li>{list}</li>
              ))}
            </ul>
            <RiArrowDropDownLine />
          </div>
        ))}
      </ul>
    </Container>
  );
};

export default Filters;

const Container = styled.div`
  background-color: #eee;
  padding: 10px;

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    list-style-type: none;
  }

  .filter-box {
    background-color: transparent;
    border: 1px solid rgb(221, 221, 221);
    display: flex;
    justify-content: space-between;
    padding: 4px 6px;
    border-radius: 4px;
    color: #666;
    font-size: 16px;
    cursor: pointer;
    position: relative;

    .filter-title {
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.3px;
    }

    .show {
      display: block;
    }

    .hide {
      display: none;
    }

    ul {
      position: absolute;
      top: 28px;
      left: 4px;
      display: flex;
      flex-direction: column;
      width: 200px;
      background-color: #eee;
      width: 100%;
      border-radius: 4px;
      padding: 4px 6px;
      z-index: 1;
      max-height: 220px;
      overflow-y: auto;
      &::-webkit-scrollbar-track {
        /* box-shadow: inset 0 0 5px grey; */
        --webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }

      &::-webkit-scrollbar {
        height: 5px;
        width: 3px;
        border: 4px solid #d5d5d5;
        background: #d5d5d5;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
        outline: 1px solid #eee;
      }

      li {
        line-height: 30px;
        background-color: #fff;
        margin: 8px 2px;
        padding: 6px;
      }
    }

    &:hover ul {
      display: block;
    }
  }
`;
