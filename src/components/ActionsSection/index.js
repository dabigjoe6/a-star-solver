import React from "react";
import Button from "../Button";

const ActionsSection = ({
  isSolving,
  isInstantSolving,
  startSolving,
  resetBoard,
  startInstantSolve
}) => {

  return (
    <div className="btn-group">
      <Button
        disabled={isSolving || isInstantSolving ? false : true}
        buttonText={"Reset"}
        onClick={resetBoard}
      />
      <Button
        disabled={isSolving || isInstantSolving}
        buttonText="Solve Graph In Steps"
        onClick={startSolving}
      />
      <Button
        disabled={isSolving || isInstantSolving}
        buttonText="Solve Graph Instantly"
        onClick={startInstantSolve}
      />
    </div>
  );
};

export default ActionsSection;
