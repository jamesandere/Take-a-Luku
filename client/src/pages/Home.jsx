import { useEffect } from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Seasons from "../components/Seasons";
import ShopByBrand from "../components/ShopByBrand";
import Socials from "../components/Socials";
import TrendingBrands from "../components/TrendingBrands";

const Home = () => {
  useEffect(() => {
    document.title = "Take A Luku";
  }, []);

  return (
    <Container>
      <Banner />
      <Header />
      <Seasons />
      <ShopByBrand />
      <TrendingBrands />
      <Socials />
      <Footer />
    </Container>
  );
};

export default Home;

const Container = styled.div``;
