import React from "react";

export default function Loader() {
  return (
    <div
      className="inline-block ml-4 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    />
  );
}
