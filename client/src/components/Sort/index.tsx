import React, { useState } from "react";
import { Input } from "../ui/input";

export default function SortBy() {
  const [state, setState] = useState("");

  const handleChange = (e: any) => {
    const { value } = e.target;
    setState(value);
  };

  return (
    <div>
      <Input
        value={state}
        placeholder="Sort Tasks By Priority"
        onChange={handleChange}
      />
    </div>
  );
}
