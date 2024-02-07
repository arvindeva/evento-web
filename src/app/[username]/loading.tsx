"use client";

import { LineWave } from "react-loader-spinner";
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center">
      <LineWave
        visible={true}
        height="100"
        width="100"
        color="#9000ff"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
}
