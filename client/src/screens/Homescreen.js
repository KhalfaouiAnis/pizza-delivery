import Pizza from "../components/pizza/Pizza.component";
// import pizzas from "../pizzasdata";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../redux/actions/pizzaActions";
import Loading from "../components/loading/Loading.component";
import Error from "../components/error/Error.component";
import Filter from "../components/filter/Filter.component";
import Modal from "../components/modal/Modal.component";
import ScrollTopArrow from "../components/scroll-top-arrow/ScrollTopArrow";

export default function Homescreen() {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.pizzasList);
  const { error, loading, pizzas } = pizzasState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="homepage-container">
        <Filter />
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
      <Filter />
      <div className="row justify-content-center">
        {error && <Error error={error} />}
        {pizzas.length === 0 && <Modal message="No meals matchs your search" />}
        {pizzas.map((pizza) => {
          return (
            <div className="col-md-3 m-3">
              <div>
                <Pizza pizza={pizza} />
              </div>
            </div>
          );
        })}
        <ScrollTopArrow />
      </div>
    </div>
  );
}
