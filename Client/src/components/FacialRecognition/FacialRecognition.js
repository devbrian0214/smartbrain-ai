import React from 'react';
import './FacialRecognition.css';

const FacialRecognition = ({ Boxes, imageUrl }) => {
  const ArrBoxes = Boxes?.map((Box, i) => (
    <div
      key={i}
      className="bounding-box"
      style={{
        top: Box.topRow,
        right: Box.rightCol,
        left: Box.leftCol,
        bottom: Box.bottomRow,
      }}
    ></div>
  ));

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="mainImage"
          alt="sample"
          src={imageUrl}
          width="500px"
          height="auto"
        />
        {ArrBoxes}
      </div>
    </div>
  );
};

export default FacialRecognition;
