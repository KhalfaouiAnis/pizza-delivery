import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading.component";
import Error from "../../components/error/Error.component";
import UserTableRow from "../../components/table-row/UserTR.component";
import { deleteUser, getAllUsers } from "../../redux/actions/userActions";
import AOS from "aos";

import "../../styles/users-list.styles.css";
export default function UsersList() {
  AOS.init();

  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.usersList);
  const { error, deleteLoading, users } = usersState;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function handleDelete(userId) {
    dispatch(deleteUser(userId));
  }

  if (deleteLoading) {
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
      <h2 className="d-flex align-items-center text-left">Customers</h2>
      {error && <Error error={error} />}
      <table className="table table-striped" data-aos="zoom-in">
        <thead className="thead-dark">
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <UserTableRow
                  key={user._id}
                  user={user}
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
