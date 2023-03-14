import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { ralphLauren } from "../data";
import { useState, useEffect } from "react";
import { setHeaders, url } from "../redux/api";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState({});
  const params = useParams();
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const [size, setSize] = useState("");

  useEffect(() => {
    // document.title =
    //   "Polo Ralph Lauren icon logo slim fit pique polo in pink marl";

    const fetchProduct = async () => {
      const res = await axios.get(`${url}/products/${params.id}`);
      setProduct(res?.data);
      setImages(res?.data.images);
    };

    fetchProduct();
  }, [params]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, size }));
  };

  return (
    <Container>
      <section>
        <div className="product-gallery">
          <div className="gallery-aside">
            <ul>
              {images?.map((image, i) => (
                <li
                  className={i === index && "active"}
                  onClick={() => setIndex(i)}
                >
                  <img src={image?.url} alt="" />
                </li>
              ))}
            </ul>
          </div>
          <div className="gallery-carousel">
            <Arrow
              className={`arrow ${index === 0 && "hide"}`}
              direction="left"
              onClick={() => {
                index > 0 && setIndex(index - 1);
              }}
            >
              <MdOutlineArrowBackIos />
            </Arrow>
            <Arrow
              className={`arrow ${index === images?.length - 1 && "hide"}`}
              direction="right"
              onClick={() => index < images?.length - 1 && setIndex(index + 1)}
            >
              <MdOutlineArrowForwardIos />
            </Arrow>
            <div
              className="carousel-inner"
              style={{ backgroundImage: `url(${images[index]?.url})` }}
            ></div>
          </div>
        </div>
        <div className="right">
          <h1>{product.title}</h1>
          <div className="product-price">
            <span>Now £71.50</span>
            <span>£{product.price?.toFixed(2)}</span>
          </div>
          <div className="product-colour">
            <h2>Colour:</h2>
            <p>{product.color?.toLowerCase()}</p>
          </div>
          <div className="product-size">
            {product.size?.length > 0 && <h3>Size:</h3>}
            <div className="size-select">
              {product.size?.length > 0 && (
                <select onChange={(e) => setSize(e.target.value)}>
                  <option value="">Please select</option>
                  {product.size?.map((size) => (
                    <option value={size}>{size}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="product-save">
              <button onClick={() => handleAddToCart(product)}>
                Add To Bag
              </button>
              <div className="save-for-later">
                <RiHeart3Line />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="product-description-container">
        <div className="product-details">
          <h2>Product Details</h2>
          <p>Polo shirt by Polo Ralph Lauren</p>
          <ul>
            <li>Waist-up dressing</li>
            <li>Polo collar</li>
            <li>Partial button placket</li>
            <li>Logo embroidery to chest</li>
            <li>Short sleeves</li>
            <li>Side splits</li>
            <li>Slim fit</li>
          </ul>
        </div>
        <div className="product-brand">
          <h2>Brand</h2>
          <p>
            Known for its collegiate-cool American style, heritage brand Polo
            Ralph Lauren is a big player in the menswear game. Sample some of
            its signature preppy designs with our Polo Ralph Lauren at ASOS
            edit, featuring iconic logo polo shirts, T-shirts, smart shirts,
            jumpers and chilled-out loungewear. And that’s not all – with a
            range of underwear, swimwear and accessories too, you can pick up
            branded boxers, beach-ready swim shorts and a bag to fit it all in.
          </p>
        </div>
        <div className="product-size-fit">
          <h2>Size & Fit</h2>
          <p>Model's height: 183cm/6'0"</p>
          <p>Model is wearing: Size Medium</p>
        </div>
        <div className="product">
          <h2>About</h2>
          <p>
            Pique: breathable fabric with a raised, dot-like pattern <br />{" "}
            Main: 100% Cotton.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Product;

const Container = styled.div`
  section {
    width: 100%;
    margin: 0 auto;
    max-width: 960px;
    position: relative;
    display: flex;
    padding: 2rem 1rem;

    .hide {
      display: none;
    }

    .right {
      flex: 1;
      margin-left: 30px;

      h1 {
        font-size: 18px;
        letter-spacing: 0.6px;
        line-height: 24px;
        color: #2d2d2d;
        font-weight: 200;
        margin-top: 25px;
      }

      .product-price {
        display: block;
        margin-top: 24px;

        span {
          display: block;
          font-size: 18px;
          line-height: 24px;
          letter-spacing: 0.8px;
          color: #2d2d2d;

          &:first-child {
            color: #d01345;
          }
        }
      }

      .product-colour {
        display: block;
        margin-top: 24px;

        h2 {
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 2.5px;
          line-height: 1.2;
          color: #2d2d2d;
          text-transform: uppercase;
          display: inline-block;
        }

        p {
          margin-left: 6px;
          display: inline-block;
          font-size: 16px;
          font-weight: normal;
          letter-spacing: 0.4px;
          line-height: 22px;
          color: #2d2d2d;
        }
      }

      .product-size h3 {
        color: #2d2d2d;
        font-size: 12px;
        line-height: 1.7;
        letter-spacing: 1.7px;
        text-transform: uppercase;
        padding-right: 6px;
        margin-top: 24px;
      }

      .size-select {
        padding-top: 9px;
        font-weight: 400;

        select {
          padding-top: 6px;
          padding-bottom: 6px;
          padding-left: 8px;
          font-weight: 400;
          width: 100%;
          color: #2d2d2d;
          border: solid 1px #999;
          font-size: 16px;
          line-height: 1.5;
          letter-spacing: 0.4px;
          outline: none;

          option {
            color: #2d2d2d;
          }
        }
      }

      .product-save {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;

        button {
          background-color: #018849;
          color: #fff;
          width: 80%;
          text-align: center;
          text-transform: uppercase;
          height: 41px;
          letter-spacing: 2px;
          cursor: pointer;
          border: none;
          outline: none;
        }

        .save-for-later {
          background-color: #eee;
          height: 41px;
          width: 41px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .product-gallery {
      display: flex;
      flex: 2;

      .gallery-aside ul {
        list-style-type: none;
        margin-right: 20px;
        margin-top: 20px;

        li {
          cursor: pointer;
          margin: 4px 0;

          img {
            height: 52px;
            width: 40px;
            max-width: 40px;
            object-fit: contain;
          }
        }
      }

      .gallery-carousel {
        width: 500px;
        height: 700px;
        position: relative;

        .carousel-inner {
          height: 100%;
          width: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          transition: all 0.5s;
        }
      }
    }
  }

  .product-description-container {
    padding: 2rem 3.2rem;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 2fr;
    grid-gap: 30px;

    h2 {
      color: #999;
      text-transform: uppercase;
      margin-bottom: 5px;
      margin-top: 20px;
      font-size: 14px;
      line-height: 1.7;
      letter-spacing: 0.4px;
      letter-spacing: 2px;
    }

    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 1.5;
      letter-spacing: 0.4px;
      color: #2d2d2d;
      margin-bottom: 10px;
    }

    .product-details {
      ul {
        padding: 10px 20px;
      }

      ul li {
        line-height: 30px;
      }
    }
  }

  .active {
    opacity: 0.4;
  }
`;

const Arrow = styled.div`
  position: absolute;
  font-size: 22px;
  padding: 12px;
  background-color: hsla(0, 0%, 100%, 0.8);
  /* height: 41px;
  width: 41px; */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  top: 50%;
  left: ${({ direction }) => direction === "left" && "10px"};
  right: ${({ direction }) => direction === "right" && "10px"};
`;
