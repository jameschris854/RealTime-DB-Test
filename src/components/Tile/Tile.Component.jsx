import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "./Tile.styles.scss";

const Tile = ({ data,checkTile,updateTile }) => {
  

  return  <div className="tile-container">
  {
    data.map((item, key) => (
      <div
        className={`tile ${checkTile(key)}`}
        key={key}
        onClick={() => updateTile(key)}
      >
        <div>{item}</div>
      </div>
    ))}
</div>
};

export default Tile;
