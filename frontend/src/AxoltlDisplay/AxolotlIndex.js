import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import { useHistory } from "react-router";

function AxolotlIndex() {
  //const history = useHistory();

  const [axolotl, setAxolotl] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/all`);
      const resData = await response.json();
      setAxolotl(resData);
    };
    fetchData();
  }, []);

  let axolotlFormatted = axolotl.map((axolotl) => {
    return (
      <div key={axolotl.Id}>
        <h2>
          <Link to={`/axolotl/${axolotl.axolotlId}`}>{axolotl.name}</Link>
        </h2>
        <img style={{ maxWidth: 200 }} src={axolotl.pic} alt={axolotl.name} />
        <p>
          Local to {axolotl.local}, Live in {axolotl.habitat}, Discovered in{" "}
          {axolotl.discovered}
        </p>
      </div>
    );
  });
  return (
    <div>
      <h1>Types of Axolotls</h1>
      {axolotlFormatted}
    </div>
  );
}

export default AxolotlIndex;
