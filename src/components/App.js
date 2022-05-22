import React, { useState, useRef } from "react";
import Scanner from "./Scanner";
import useGetFoodInfo from "../hooks/useGetFoodInfo";

const App = () => {
  const [isScanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState();

  const {
    state: { data: foodInfo, isLoading, error },
    fetchData: fetchFoodInfo
  } = useGetFoodInfo();

  return (
    <div>
      <button onClick={() => setScanning(!isScanning)}>
        {isScanning ? "Stop" : "Start"}
      </button>

      <ScannerCanvas isScanning={isScanning} setBarcode={setBarcode} />

      {barcode && (
        <GetFoodInfoButton
          barcode={barcode}
          isLoading={isLoading}
          fetchFoodInfo={fetchFoodInfo}
        />
      )}

      {error && <ErrorMessage error={error} />}

      {foodInfo && <ApiResponse foodInfo={foodInfo} />}
    </div>
  );
};

export default App;

const ScannerCanvas = ({ isScanning, setBarcode }) => {
  const scannerRef = useRef(null);

  return (
    <div
      ref={scannerRef}
      style={{ position: "relative", border: "3px solid red" }}
    >
      <canvas
        className="drawingBuffer"
        style={{
          position: "absolute",
          top: "0px",
          // left: '0px',
          // height: '100%',
          // width: '100%',
          border: "3px solid green"
        }}
        width="640"
        height="480"
      />
      {isScanning ? (
        <Scanner
          scannerRef={scannerRef}
          onDetected={(barcode) => setBarcode(barcode)}
        />
      ) : null}
    </div>
  );
};

const GetFoodInfoButton = ({ barcode, isLoading, fetchFoodInfo }) => {
  return (
    <div>
      <button
        onClick={() => {
          if (barcode) fetchFoodInfo({ barcode });
        }}
        disabled={isLoading}
      >
        {isLoading ? "Loading Food Data..." : `Get Food Info for ${barcode}`}
      </button>
    </div>
  );
};

const ErrorMessage = ({ error }) => (
  <div>{`Error getting food info. ${error.message ? error.message : ""}`}</div>
);

const ApiResponse = ({ foodInfo }) => {
  console.log(foodInfo);
  return <pre>{JSON.stringify(foodInfo, null, 2)}</pre>;
};
