import { useState } from "react";
import { Link } from "react-router-dom";

const Leads = () => (
  <div className="w-full">
    <Inspection />
  </div>
);

const Inspection = () => {
  const [id, setId] = useState("");

  return (
    <div>
      <div className="mb-1 h-8">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="h-full border rounded pl-1 w-80 border-gray-200"
        ></input>{" "}
        <Link to={`/leads/${id}`}>
          <button className="h-full border rounded border-gray-200 py-1 px-1 hover:bg-gray-200">
            Inspect
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Leads;
