import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url, setHeaders } from "../redux/api";
import { productsCreate } from "../redux/productsSlice";
import { IoMdClose } from "react-icons/io";

const CreateProduct = () => {
  const mainImages = [
    "https://images.asos-media.com/products/polo-ralph-lauren-icon-logo-slim-fit-pique-polo-in-pink-marl/202060038-1-pinkmarl?$n_960w$&wid=952&fit=constrain",
    "https://images.asos-media.com/products/polo-ralph-lauren-icon-logo-slim-fit-pique-polo-in-pink-marl/202060038-2?$n_960w$&wid=952&fit=constrain",
    "https://images.asos-media.com/products/polo-ralph-lauren-icon-logo-slim-fit-pique-polo-in-pink-marl/202060038-3?$n_960w$&wid=952&fit=constrain",
    "https://images.asos-media.com/products/polo-ralph-lauren-icon-logo-slim-fit-pique-polo-in-pink-marl/202060038-4?$n_960w$&wid=952&fit=constrain",
  ];

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await axios.get(`${url}/brands`, setHeaders());
        setBrands(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBrands();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${url}/categories`, setHeaders());
        setCategories(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
        setImagesUrl((oldArray) => [...oldArray, reader.result]);
      };
    });
  };

  const removeImage = (image) => {
    setImages(images.filter((img) => img !== image));
  };

  const handleSizes = () => {
    setSizes((oldArray) => [...oldArray, size]);
    setSize("");
  };

  const saveSize = (e) => {
    setSize(e.target.value);
  };

  const removeSize = (size) => {
    setSizes(sizes.filter((s) => s !== size));
  };

  const handleTags = () => {
    setTags((oldArray) => [...oldArray, tag]);
    setTag("");
  };

  const saveTag = (e) => {
    setTag(e.target.value);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((s) => s !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      productsCreate({
        brand_id: brand,
        title,
        desc,
        color,
        size: sizes,
        tags,
        gender,
        price,
        images,
        category,
      })
    );

    // setBrand("");
    // setTitle("");
    // setDesc("");
    // setColor("");
    // setSize("");
    // setSizes([]);
    // setGender("");
    // setImages([]);
    // setPrice("");
    // setCategory("");
  };

  return (
    <Container>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="desc">Product Description</label>
          <textarea
            type="text"
            name="desc"
            rows="5"
            cols="50"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <label htmlFor="color">Product Color</label>
          <input
            type="text"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="images">Select Images</label>
          <input
            onChange={handleImages}
            type="file"
            accept="image/*"
            name="images"
            multiple
          />
          <div className="size-container">
            <div className="size-input-container">
              <div className="size-input">
                <label htmlFor="size">Sizes</label>
                <input
                  onChange={saveSize}
                  value={size}
                  type="text"
                  name="size"
                />
              </div>
              <button onClick={handleSizes}>Add Size</button>
            </div>
            <div className="sizes">
              {sizes.length > 0 &&
                sizes.map((size) => (
                  <div className="sizes-display">
                    <span>{size}</span>
                    <div
                      className="close-size-btn"
                      onClick={() => removeSize(size)}
                    >
                      <IoMdClose />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="size-container">
            <div className="size-input-container">
              <div className="size-input">
                <label htmlFor="price">Tags</label>
                <input onChange={saveTag} value={tag} type="text" name="size" />
              </div>
              <button onClick={handleTags}>Add Tag</button>
            </div>
            <div className="sizes">
              {tags.length > 0 &&
                tags.map((tag) => (
                  <div className="sizes-display">
                    <span>{tag}</span>
                    <div
                      className="close-size-btn"
                      onClick={() => removeTag(tag)}
                    >
                      <IoMdClose />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <select onChange={(e) => setGender(e.target.value)}>
            <option value="">Please select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="All">All</option>
            <option value="Other">Other...</option>
          </select>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
          <select onChange={(e) => setBrand(e.target.value)}>
            <option value="">Select brand</option>
            {brands.map((brand) => (
              <option value={brand._id}>{brand.name}</option>
            ))}
          </select>
          <button>Create Product</button>
        </form>
        <ImageContainer>
          {images.length > 0 ? (
            images.map((image, index) => (
              <div className="image-container">
                <img src={image} alt="" />
                <div
                  className="close-img-btn"
                  onClick={() => removeImage(image)}
                >
                  <IoMdClose />
                </div>
              </div>
            ))
          ) : (
            <p>Image previews will appear here..</p>
          )}
        </ImageContainer>
      </section>
    </Container>
  );
};

export default CreateProduct;

const Container = styled.div`
  section {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 2rem;
    form {
      display: flex;
      flex-direction: column;
      width: 100%;

      label {
        line-height: 1.7;
        letter-spacing: 0.4px;
        color: #767676;
        letter-spacing: 1px;
        font-weight: 700;
        margin-top: 12px;

        &:nth-child(1) {
          margin-top: 0;
        }

        &::after {
          content: ":";
          width: auto;
          color: #767676;
        }
      }

      input,
      textarea,
      button {
        min-height: 40px;
        outline: none;
        font-size: 16px;
      }

      input {
        padding: 4px 8px;
        height: 44px;
      }

      textarea {
        padding: 10px;
      }

      button {
        background: #2d2d2d;
        color: #fff;
        border: none;
        cursor: pointer;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-top: 10px;

        &:hover {
          background: rgb(118, 118, 118);
        }
      }

      select {
        border: 1px solid #ddd;
        padding: 6px 4px;
        margin-top: 8px;
        outline: none;
      }
    }

    .size-container {
      /* min-height: 140px; */
      /* border: 1px solid #ddd; */
      display: flex;
      flex-direction: column;
      width: 100%;

      .size-input-container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        /* background: red; */
        padding: 4px 0;
        .size-input {
          display: flex;
          flex-direction: column;
          width: 100%;
          input {
          }
        }

        button {
          width: 200px;
          height: 20px;
          margin-left: 10px;
        }
      }

      .sizes {
        margin-top: 6px;
        display: flex;
        flex-wrap: wrap;

        .sizes-display {
          border: 1px solid rgba(230, 230, 230, 1);
          border-radius: 3px;
          padding: 10px 16px;
          font-size: 16px;
          /* display: inline-block; */
          margin: 8px;
          /* min-width: 100px; */
          cursor: pointer;
          position: relative;

          span {
            margin-right: 6px;
          }

          .close-size-btn {
            position: absolute;
            top: 2px;
            right: 2px;
            color: #767676;
          }
        }
      }
    }
  }
`;

const ImageContainer = styled.div`
  border: 1px solid rgb(183, 183, 183);
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* column-gap: 6px; */
  width: 100%;
  min-height: 90vh;
  margin-left: 20px;
  padding: 6px;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-container {
    position: relative;
    margin: 6px;

    img {
      width: 100%;
      object-fit: contain;
    }

    .close-img-btn {
      position: absolute;
      top: 2px;
      right: 4px;
      cursor: pointer;
      background: hsla(0, 0%, 100%, 0.8);
      padding: 6px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
