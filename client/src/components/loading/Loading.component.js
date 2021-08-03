import "./loading.styles.css";
import Loader from "../../assets/images/loader.gif";
export default function Loading() {
  return (
    <div>
      <img className="spinner-border" src={Loader} alt="loader" />
    </div>
  );
}
