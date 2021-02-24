import { inspectLead } from "common/requests/leads";
import { useState } from "react";

const Leads = () => (
  <div className="w-full">
    <div className="flex flex-row">List</div>
    <Inspection />
  </div>
);

const Inspection = () => {
  const [id, setId] = useState("");
  const [leadData, setLeadData] = useState("");

  const inspect = async (e) => {
    setLeadData("");

    const [success, data] = await inspectLead(id);

    if (success) {
      setLeadData(data);
    } else {
      setLeadData(data);
    }
  };

  return (
    <div>
      <div className="mb-1 h-8">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="h-full border rounded pl-1 w-80 border-gray-200"
        ></input>{" "}
        <button
          onClick={inspect}
          className="h-full border rounded border-gray-200 py-1 px-1 hover:bg-gray-200"
        >
          Inspect
        </button>
      </div>
      {leadData ? <LeadPresenation data={leadData} /> : null}
    </div>
  );
};

const LeadPresenation = (props) => (
  <div className="bg-gray-200 text-xs py-2 px-2">
    <pre>{JSON.stringify(props.data, null, 2)}</pre>
  </div>
);

export default Leads;
