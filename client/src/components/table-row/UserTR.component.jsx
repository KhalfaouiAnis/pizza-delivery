import "./table-row.styles.css";
import ClosedTrash from "../../assets/icons/icons8-trash-32.png";
import animatedTrash from "../../assets/icons/icons8-trash-can.gif";
import { useState } from "react";

export default function UserTableRow({ user, handleDelete, deleteLoading }) {
  const [trashIcon, setTrash] = useState(ClosedTrash);
  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.createdAt.substring(0, 10)}</td>
      <td>
        {
          // <i
          //   className="far fa-trash-alt trash-icon"
          //   onClick={() => handleDelete(user._id)}
          // ></i>
          <img
            className="trash-icon"
            src={trashIcon}
            alt="trash icon"
            onMouseOver={() => {
              setTrash(animatedTrash);
            }}
            onMouseLeave={() => {
              setTrash(ClosedTrash);
            }}
            onClick={() => {
              handleDelete(user._id);
            }}
          ></img>
        }
      </td>
    </tr>
  );
}
