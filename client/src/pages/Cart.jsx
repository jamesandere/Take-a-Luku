import styled from "styled-components";
import { RiHeart3Line, RiHeart3Fill, RiCloseFill } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
} from "../redux/cartSlice";
import { addToSavedList } from "../redux/savedItems";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url, setHeaders } from "../redux/api";
import Socials from "../components/Socials";
import Footer from "../components/Footer";

const Cart = () => {
  const [deleted, setDeleted] = useState(false);
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Shopping Bag | Take A Luku";

    dispatch(getTotals());
  }, [cartItems, dispatch]);

  // const handleCheckout = async () => {
  //   await axios
  //     .post(
  //       `${url}/stripe/create-checkout-session`,
  //       { cartItems },
  //       setHeaders()
  //     )
  //     .then((response) => {
  //       if (response.data.url) {
  //         window.location.href = response.data.url;
  //       }
  //     })
  //     .catch((error) => console.log(error.message));
  // };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    // setDeleted(true);
  };

  const handleIncreaseQuantity = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleDecreaseFromCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleAddToSavedList = (item) => {
    dispatch(addToSavedList(item));
    handleRemoveFromCart(item);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Container>
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h2>Cart is empty</h2>
          </div>
        ) : (
          <section>
            <div className="bag-contents">
              <div className="bag-contents-title">
                <h2>MY BAG</h2>
                <p>Items are reserved for 60 minutes</p>
              </div>
              <div className="bag-list">
                {cartItems?.map((item) => (
                  <div className="bag-item">
                    <img src={item.images[0]?.url} alt="" />
                    <div className="bag-item-desc">
                      <div className="bag-item-price">
                        <span className="price-discount">£71.50</span>
                        <span className="price-current">
                          £{item.price.toFixed(2)}
                        </span>
                      </div>
                      <p>{item.title}</p>
                      {/* <div className="variants">
                      <span>{item.color}</span>
                      <span>
                        <select>
                          {item.sizes?.map((size, i) => (
                            <option value={size}>{size}</option>
                          ))}
                        </select>
                      </span>
                      <span>
                        <select>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </span>
                    </div> */}
                      <div className="cart-variants">
                        <div className="color-size-variant">
                          <div>
                            <span>Colour:</span>
                            <span>{item.color?.toLowerCase()}</span>
                          </div>
                          <div>
                            <span>Size:</span>
                            <span>{item.size}</span>
                          </div>
                        </div>
                        <div className="cart-product-quantity">
                          <button onClick={() => handleDecreaseFromCart(item)}>
                            -
                          </button>
                          <div className="count">{item.quantity}</div>
                          <button onClick={() => handleIncreaseQuantity(item)}>
                            +
                          </button>
                        </div>
                      </div>
                      <button>
                        <RiHeart3Line />
                        Save for later
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="btn-delete"
                    >
                      <RiCloseFill />
                    </button>
                    <div className={deleted && `item-deleted`}>
                      {/* <span>Item deleted</span> */}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bag-subtotal">
                <button onClick={handleClearCart} className="clear-cart-btn">
                  Clear Cart
                </button>
                <p>
                  <span>SUBTOTAL:</span>
                  <span>£{cartTotalAmount.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <div className="bag-total">
              <h2>Total</h2>
              <p>
                <span>Sub-total</span>
                <span>£{cartTotalAmount.toFixed(2)}</span>
              </p>
              <p className="bag-delivery">
                <span>Delivery</span>
                <span>
                  <AiOutlineExclamationCircle />
                </span>
              </p>
              <div className="select-delivery">
                <span>
                  <select>
                    <option value="">Standard Delivery (Free)</option>
                    <option value="">Express Delivery (£20.00)</option>
                  </select>
                </span>
              </div>
              <div className="checkout">
                <button onClick={handleCheckout}>Checkout</button>
              </div>
              <div className="bag-payment-options">
                <h3>We Accept:</h3>
                <img
                  src="https://assets.asosservices.com/asos-finance/images/marketing/single.png"
                  alt=""
                />
                <p className="discount-message">
                  Got a discount code? Add it in the next step.
                </p>
              </div>
            </div>
          </section>
        )}
      </Container>
      <Socials />
      <Footer />
    </>
  );
};

export default Cart;

const Container = styled.div`
  background: #eeeeee;
  padding: 20px;

  .cart-empty {
    font-size: 20px;
    color: rgb(84, 84, 84);
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 40vh;
  }

  section {
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;

    .bag-contents {
      display: flex;
      flex-direction: column;
      width: 60.6382978723%;

      .bag-contents-title {
        display: flex;
        justify-content: space-between;
        padding: 24px 30px;
        margin-bottom: 8px;
        background-color: #fff;
        border-radius: 4px;

        h2 {
          font-size: 1.15em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          line-height: 22px;
        }

        p {
          line-height: 20px;
          font-size: 0.88em;
          letter-spacing: 0.6px;
        }
      }

      .bag-list {
        padding: 20px 30px;
        margin-bottom: 8px;
        background-color: #fff;
        border-radius: 4px;

        .bag-item {
          display: flex;
          position: relative;
          border-bottom: 1px solid #eee;
          padding-bottom: 24px;
          margin-bottom: 16px;

          .item-deleted {
            background-color: #ddd;
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 0;
            overflow: hidden;
            animation: delete 1.5s linear forwards;
            display: flex;
            align-items: center;
            justify-content: center;

            @keyframes delete {
              from {
                width: 0;
              }

              to {
                width: 100%;
              }
            }
          }

          &:last-child {
            border: none;
            padding-bottom: 0;
          }

          img {
            width: 110px;
            height: 140px;
          }

          .btn-delete {
            position: absolute;
            top: 2px;
            right: 12px;
            padding: 4px;
            cursor: pointer;
            font-size: 22px;
            outline: none;
            border: none;
            background-color: transparent;
            color: #666;
          }

          .bag-item-desc {
            padding-right: 45px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;
            color: #666;

            .bag-item-price {
              span {
                margin-right: 4px;
              }
              .price-discount {
                color: #d01345;
                font-weight: 700;
              }

              .price-current {
                color: #2d2d2d;
                text-decoration: line-through;
                font-weight: 500;
              }
            }

            p {
              color: #2d2d2d;
              letter-spacing: 0.5px;
              font-size: 0.92em;
              line-height: 1.5em;
              max-height: 3.1em;
              width: 350px;
              margin-top: 10px;
            }

            /* .variants {
              display: flex;
              align-items: center;
              margin-top: 6px;

              span select {
                border: 1px solid #ddd;
                border-radius: 3px;
                padding: 2px 4px;
                margin: 0 6px;
                outline: none;
                width: 47px;
              }
            } */

            .cart-variants {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .color-size-variant {
                div {
                  margin-top: 9px;

                  span:nth-child(1) {
                    text-transform: uppercase;
                    margin-right: 4px;
                    font-weight: 700;
                    letter-spacing: 1px;
                  }

                  span:nth-child(2) {
                    font-size: 16px;
                  }
                }
              }

              .cart-product-quantity {
                display: flex;
                align-items: flex-start;
                button {
                  width: auto;
                  height: auto;
                  outline: none;
                  border: none;
                  background: none;
                  cursor: pointer;
                  padding: 0.7rem 1.5rem;
                }

                .count {
                  padding: 0.7rem 0;
                }
              }
            }

            button {
              background-color: #fff;
              border: 1px solid #eee;
              color: #2d2d2d;
              cursor: pointer;
              font-size: 0.75em;
              letter-spacing: 0.4px;
              margin-top: 6px;
              padding: 6px 20px;
              width: 180px;
              text-align: center;

              svg {
                margin-right: 8px;
                color: #666;
              }
            }
          }
        }
      }
      .bag-subtotal {
        /* text-align: right; */
        background-color: #fff;
        border-radius: 4px;
        font-weight: 700;
        line-height: 1.375em;
        letter-spacing: 2px;
        text-transform: uppercase;
        padding: 24px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .clear-cart-btn {
          background: none;
          outline: none;
          width: 130px;
          height: 40px;
          border: 0.5px solid rgb(177, 177, 177);
          border-radius: 5px;
          color: gray;
          cursor: pointer;
          font-weight: 400;
          letter-spacing: 1.15px;
        }

        span {
          margin-left: 20px;
        }
      }
    }

    .bag-total {
      flex: 1;
      padding: 24px 30px;
      margin-left: 10px;
      background-color: #fff;
      border-radius: 4px;

      h2 {
        border-bottom: 1px solid #eee;
        padding-bottom: 24px;
        margin-bottom: 14px;
        font-size: 1.15em;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 700;
        line-height: 22px;
      }

      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .bag-delivery {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-weight: 700;
        letter-spacing: 2px;
        margin-top: 6px;
      }

      .select-delivery {
        span select {
          width: 300px;
          outline: none;
          border: none;
          border-bottom: 1px solid gray;
          padding: 10px 0;
          line-height: 24px;
          color: #666;
          font-weight: 400;
          padding-left: 8px;
        }
      }

      .checkout button {
        background-color: #018849;
        color: #fff;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        height: 41px;
        letter-spacing: 1px;
        cursor: pointer;
        border: none;
        outline: none;
        margin: 18px 0;
        font-weight: 700;
      }

      .bag-payment-options {
        h3 {
          text-transform: uppercase;
          font-size: 0.875em;
          font-style: normal;
          font-weight: 700;
          letter-spacing: 2px;
        }

        img {
          max-width: 100%;
          max-height: 20px;
          margin-top: 10px;
        }

        p {
          font-size: 14px;
          letter-spacing: 0.4px;
          margin-top: 10px;
        }
      }
    }
  }
`;
