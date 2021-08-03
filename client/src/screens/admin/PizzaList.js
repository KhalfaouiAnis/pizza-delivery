import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPizzas, deletePizza } from "../../redux/actions/pizzaActions";
import Loading from "../../components/loading/Loading.component";
import Error from "../../components/error/Error.component";
import Modal from "../../components/modal/Modal.component";
import PizzaTableRow from "../../components/table-row/PizzaTR.component";

export default function PizzaList() {
  const dispatch = useDispatch();
  const pizzaState = useSelector((state) => state.pizzasList);
  const { error, loading, pizzas } = pizzaState;

  const deletePizzaState = useSelector((state) => state.deletePizza);
  const { deleteLoading } = deletePizzaState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  function handleDelete(pizzaId) {
    dispatch(deletePizza(pizzaId));
    setTimeout(() => {
      dispatch(getAllPizzas());
    }, 1000);
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
      <h2 className="text-left">Pizza List</h2>
      {error && <Error error={error} />}
      {/* {pizzas.length === 0 && <Modal message="No Foods found" />} */}
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas &&
            pizzas.map((pizza) => {
              return (
                <PizzaTableRow
                  key={pizza._id}
                  pizza={pizza}
                  deleteLoading={deleteLoading}
                  handleDelete={handleDelete}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
