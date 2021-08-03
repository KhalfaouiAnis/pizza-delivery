import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

import AOS from "aos";
import "./pizza.styles.css";

export default function Pizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState("small");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addtotart() {
    dispatch(addToCart(pizza, quantity, varient));
  }

  AOS.init();
  return (
    <div
      data-aos="zoom-in"
      className="pizza-container shadow-lg p-3 mb-5 bg-white rounded"
    >
      <div onClick={handleShow} className="pizza-header">
        <h6 className="text-center">{pizza.name}</h6>
        <img src={pizza.image} className="img-fluid" alt="Pizza" />
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <p>Varients</p>
          <select
            className="form-control"
            value={varient}
            onChange={(e) => setVarient(e.target.value)}
          >
            {pizza.varients.map((varient) => {
              return <option value={varient}>{varient}</option>;
            })}
          </select>
        </div>
        <div className="m-1 w-100">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {[...Array(10).keys()].map((_, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <h1 className="mt-1">
            Price: {pizza.prices[0][varient] * quantity}£
          </h1>
        </div>
        <div className="m-1 w-100">
          <button className="shake-btn btn" onClick={addtotart}>
            Add To Cart
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation centered>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <img
            className="img-fluid modal-image"
            src={pizza.image}
            alt="Pizza"
          />
          <p className="modal-description">{pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="shake-btn btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
