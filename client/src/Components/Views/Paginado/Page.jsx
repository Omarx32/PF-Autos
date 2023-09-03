import React from "react";
import "../Paginado/Page.css";
const Page = ({ prev, next }) => {
  return (
    <div>
      <button onClick={prev}>Página anterior</button>
      <button onClick={next}>Página siguiente</button>
    </div>
  );
};

export default Page;
