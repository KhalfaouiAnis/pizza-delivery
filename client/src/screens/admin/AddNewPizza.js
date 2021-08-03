import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../../redux/actions/pizzaActions";

import Loading from "../../components/loading/Loading.component";
import Error from "../../components/error/Error.component";
import Success from "../../components/success/Success.component";

export default function AddNewPizza() {
  const [name, setName] = useState("");
  const [smallPrice, setSmallPrice] = useState();
  const [mediumPrice, setMediumPrice] = useState();
  const [largePrice, setLargePrice] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const addPizzaState = useSelector((state) => state.addPizza);
  const { error, loading, success } = addPizzaState;

  const dispatch = useDispatch();

  function emptyState() {
    setName("");
    setSmallPrice("");
    setMediumPrice("");
    setLargePrice("");
    setImage("");
    setDescription("");
    setCategory("");
  }

  function submitHandler(e) {
    e.preventDefault();
    const pizza = {
      name,
      description,
      image,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      },
    };
    dispatch(addPizza(pizza));
    emptyState();
  }

  if (loading) {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="text-center" style={{ marginTop: "6rem" }}>
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center shadow-lg p-3 mb-5 bg-white rounded">
          <h2>New Pizza</h2>
          {error && <Error error={error} />}
          {success && <Success success={`${name} Pizza Added`} />}
          <form onSubmit={submitHandler}>
            <input
              className="form-control"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="smal varient price"
              value={smallPrice}
              onChange={(e) => setSmallPrice(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="medium varient price"
              value={mediumPrice}
              onChange={(e) => setMediumPrice(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="large varient price"
              value={largePrice}
              onChange={(e) => setLargePrice(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button
              className="shake-btn admin-btn btn btn-block mt-3 mb-4"
              onClick={submitHandler}
            >
              Add Pizza
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
