import styled from "styled-components";

const SocialButtons = ({ heading }) => {
  return (
    <Container>
      <h2>{heading ? heading : "or sign in with..."}</h2>
      <div className="login-buttons">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#4285F4"
                d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
              />
            </g>
          </svg>
          <span>Google</span>
        </button>
        <button>
          <img src="/images/fb2.png" alt="" />
          <span>Facebook</span>
        </button>
        <button>
          <img src="/images/twitter.jpg" alt="" />
          <span>Twitter</span>
        </button>
      </div>
    </Container>
  );
};

export default SocialButtons;

const Container = styled.div`
  margin-bottom: 20px;

  h2 {
    text-align: center;
    margin: 40px auto 40px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: 2.3px;
  }

  .login-buttons {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      height: 50px;
      display: flex;
      align-items: center;
      flex: 1;
      margin: 0 4px;
      border: 2px solid #ddd;
      background-color: #fff;
      outline: none;
      color: #2d2d2d;
      max-width: 320px;
      padding: 0 10px;
      cursor: pointer;

      img,
      svg {
        width: 30px;
        height: 30px;
        display: inline-block;
        margin-right: 20px;
      }

      span {
        color: #2d2d2d;
        letter-spacing: 0.8px;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 15px;
      }
    }
  }
`;
