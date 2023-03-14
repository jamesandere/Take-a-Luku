import styled from "styled-components";
import {
  RiArrowDropDownLine,
  RiHeart3Line,
  RiHeart3Fill,
} from "react-icons/ri";
import { filters, ralphLauren } from "../data";
import { Link } from "react-router-dom";
import Products from "../components/Products";
import Filters from "../components/Filters";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setHeaders, url } from "../redux/api";
import Socials from "../components/Socials";
import Footer from "../components/Footer";

const BrandCategory = () => {
  const { items, fetchStatus } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState({});
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    document.title = brand?.name;

    const fetchBrand = async () => {
      const res = await axios.get(`${url}/brands/${params.id}`);
      setBrand(res?.data);
    };

    fetchBrand();
  }, [params, brand]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const res = await axios.get(`${url}/products/?brandId=${params.id}`);
      setProducts(res?.data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [params]);

  return (
    <>
      <Container>
        <div className="brand-header">
          <h1>{brand.name}</h1>
          <p>{brand.desc}</p>
          <Filters />
        </div>
        <Products
          brandId={brand._id}
          products={products}
          isLoading={isLoading}
        />
      </Container>
      <Socials />
      <Footer />
    </>
  );
};

export default BrandCategory;

const Container = styled.div`
  .brand-header {
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      text-align: center;
      color: #2d2d2d;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 1.7px;
      line-height: 30px;
      padding: 0 16px 8px;
      margin: 30px 0 20px 0;
    }

    p {
      margin: 0 auto;
      margin-bottom: 20px;
      max-width: 1000px;
      overflow: hidden;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.4px;
      line-height: 1.5em;
      text-align: center;
      color: #2d2d2d;
    }

    .filters {
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
    }
  }
`;
