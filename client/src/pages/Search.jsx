import styled from "styled-components";
import Filters from "../components/Filters";
import Products from "../components/Products";
import { ralphLauren } from "../data";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { setHeaders, url } from "../redux/api";
import { useState, useEffect } from "react";
import Socials from "../components/Socials";
import Footer from "../components/Footer";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const location = useLocation();
  const path = location.search.split(/[=]/)[1];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `${url}/products/?keyword=${path}`,
        setHeaders()
      );
      setProducts(res?.data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [path]);

  return (
    <>
      <Container>
        {products.length === 0 ? (
          <div className="search-not-found">
            <p>No results found for:</p>
            <p>"{path}"</p>
          </div>
        ) : (
          <>
            <div className="search-header">
              <p>Your search results for:</p>
              <p>"{path}"</p>
            </div>
            <Filters />
            <Products products={products} isLoading={isLoading} />
          </>
        )}
      </Container>
      <Socials />
      <Footer />
    </>
  );
};

export default Search;

const Container = styled.div`
  .search-not-found,
  .search-header {
    background: #f8f8f8;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    padding: 16px;
    text-align: center;

    p:nth-child(2) {
      font-size: 22px;
      font-weight: 900;
      text-transform: capitalize;
      color: #2d2d2d;
      line-height: 1.45;
      letter-spacing: 1.8px;
    }
  }

  .search-not-found {
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
