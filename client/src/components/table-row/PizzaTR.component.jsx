import { useState } from "react";
import { Link } from "react-router-dom";

import ClosedTrash from "../../assets/icons/icons8-trash-32.png";
import animatedTrash from "../../assets/icons/icons8-trash-can.gif";
import editIcon from "../../assets/icons/icons8-edit-96.png";
import animatedEditIcon from "../../assets/icons/icons8-edit.gif";

export default function PizzaTableRow({ pizza, deleteLoading, handleDelete }) {
  const [trash, setTrash] = useState(ClosedTrash);
  const [edit, setEdit] = useState(editIcon);

  return (
    <tr>
      <td>{pizza.name}</td>
      <td>
        Small: {pizza.prices[0]["small"]}
        <br />
        Medium: {pizza.prices[0]["medium"]}
        <br />
        Large: {pizza.prices[0]["large"]}
      </td>
      <td>{pizza.category}</td>
      <td>
        <img
          className="trash-icon"
          src={trash}
          alt="trash icon"
          onMouseOver={() => {
            setTrash(animatedTrash);
          }}
          onMouseLeave={() => {
            setTrash(ClosedTrash);
          }}
          onClick={() => {
            handleDelete(pizza._id);
          }}
        />
        {/* <i
          className={
            deleteLoading
              ? `fa fa-spinner fa-spin fa-lg m-1`
              : "fa fa-trash fa-lg m-1"
          }
          onClick={() => handleDelete(pizza._id)}
        ></i> */}
        <Link to={`/admin/edit-pizza/${pizza._id}`}>
          <img
            className="trash-icon"
            src={edit}
            alt="trash icon"
            onMouseOver={() => {
              setEdit(animatedEditIcon);
            }}
            onMouseLeave={() => {
              setEdit(editIcon);
            }}
          />
          {/* <i className="fa fa-edit fa-lg m-1"></i> */}
        </Link>
      </td>
    </tr>
  );
}
