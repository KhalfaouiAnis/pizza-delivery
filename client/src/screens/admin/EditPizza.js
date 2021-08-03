import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../../redux/actions/pizzaActions";

import Loading from "../../components/loading/Loading.component";
import Error from "../../components/error/Error.component";
import Success from "../../components/success/Success.component";
import { useHistory } from "react-router";

export default function EditPizza({ match }) {
  const [name, setName] = useState("");
  const [smallPrice, setSmallPrice] = useState();
  const [mediumPrice, setMediumPrice] = useState();
  const [largePrice, setLargePrice] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const pizzaState = useSelector((state) => state.getPizzaById);
  const { pizza, loading, error } = pizzaState;

  const editPizzaState = useSelector((state) => state.editPizza);
  const { editLoading, editSuccess, editError, updatedPizzaId } =
    editPizzaState;

  const pizzaId = match.params.pizzaid;

  useEffect(() => {
    if (pizza && pizza._id === pizzaId) {
      setName(pizza.name);
      setDescription(pizza.description);
      setCategory(pizza.category);
      setSmallPrice(pizza.prices[0]["small"]);
      setMediumPrice(pizza.prices[0]["medium"]);
      setLargePrice(pizza.prices[0]["large"]);
      setImage(pizza.image);
    } else {
      dispatch(getPizzaById(pizzaId));
    }
  }, [pizza, dispatch, pizzaId]);

  function submitHandler(e) {
    e.preventDefault();
    const updatedPizza = {
      _id: pizzaId,
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
    dispatch(editPizza(updatedPizza));
  }

  if (loading || editLoading) {
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
          <div className="text-left edit-pizza-header">
            <i
              className="fas fa-long-arrow-alt-left go-back-icon"
              onClick={() => history.goBack()}
            ></i>
            <span className="inline-space"></span>
            <h2 className="edit-piza-title">Edit Pizza</h2>
          </div>
          {error && <Error error={error} />}
          {pizza._id === updatedPizzaId && editError && (
            <Error error={editError} />
          )}
          {pizza._id === updatedPizzaId && editSuccess && (
            <Success success="Updated pizza details successfully" />
          )}
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
              Update Pizza
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
