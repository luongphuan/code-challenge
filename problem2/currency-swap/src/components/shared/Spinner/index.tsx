import React from "react";
import "./index.css";

interface SpinnerProps {
    loading: boolean;
    children: React.ReactNode;
  }
  

const Spinner: React.FC<SpinnerProps> = ({ loading, children }) => {
  return (
    <div className="spinner-cover-container">
      {loading && (
        <div className="overlay-spinner">
          <div className="spinner-circle"></div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Spinner;
