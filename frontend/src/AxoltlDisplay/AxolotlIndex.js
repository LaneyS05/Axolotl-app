import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AxolotlIndex() {
  const [axolotls, setAxolotls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Axolotlall`); // Corrected endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const resData = await response.json();
        setAxolotls(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  let axolotlFormatted = axolotls.map((singleAxolotl) => {
    return (
      <div key={singleAxolotl.id}>
        {" "}
        {/* Corrected key */}
        <h2>
          <Link to={`/axolotl/${singleAxolotl.axolotlId}`}>
            {singleAxolotl.name}
          </Link>
        </h2>
        <img
          style={{ maxWidth: 200 }}
          src={singleAxolotl.pic}
          alt={singleAxolotl.name}
        />
        <p>
          Local to {singleAxolotl.local}, Live in {singleAxolotl.habitat},
          Discovered in {singleAxolotl.discovered}
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
