import { Link } from "react-router-dom";
import "../style/Navbar.css";

function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all">Axolotls</Link>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
