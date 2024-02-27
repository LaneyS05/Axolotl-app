import React, { useEffect, useState } from "react";

function AxolotlIndex(data) {
  const [axolotls, setAxolotls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/axolotl`);
        const resData = await response.json();
        setAxolotls(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  let axolotlsFormatted = axolotls.map((axolotl) => {
    return (
      <div className="col-sm-6" key={axolotl.axolotlId}>
        <h2>
          <a href={`/axolotls/${axolotl.axolotlId}`}>{axolotl.name}</a>
        </h2>
        <p className="text-center">{axolotl.habitat}</p>
        <img style={{ maxWidth: 200 }} src={axolotl.pic} alt={axolotl.name} />
        <p className="text-center">
          Located in {axolotl.located}, {axolotl.founded}
        </p>
      </div>
    );
  });

  return (
    <main>
      <h1>All Axolotls</h1>
      <div className="row">{axolotlsFormatted}</div>
    </main>
  );
}

export default AxolotlIndex;
