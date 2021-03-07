import { readableStatus } from "common/consts/leads";
import { inspectLead } from "common/requests/leads";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Lead = () => {
  const { id } = useParams();

  const [leadData, setLeadData] = useState("");

  const loadData = async (leadId) => {
    setLeadData("");

    const [success, data] = await inspectLead(leadId);

    if (success) {
      setLeadData(data);
    }
  };

  useEffect(() => {
    loadData(id);
  }, [id]);

  return (
    <div className="w-full">
      <div className="flex flex-row">Lead: {id}</div>
      <div className="flex flex-row">
        <div>{leadData ? <RawLeadData data={leadData.raw} /> : null}</div>
        <div className="flex flex-col">
          {leadData ? (
            <DetailedData
              lead={leadData.raw}
              sellCampaign={leadData.sellCampaign}
              transaction={leadData.transaction}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const RawLeadData = (props) => (
  <div className="bg-gray-200 text-xs py-2 px-2">
    <pre>{JSON.stringify(props.data, null, 2)}</pre>
  </div>
);

const DetailedData = (props) => (
  <>
    <div>Status: {readableStatus(props.lead.status)}</div>
    <div>
      Seller:{" "}
      <Link
        to={`/clients/${props.sellCampaign.client_id}`}
        className="underline"
      >
        {props.sellCampaign.client.name}
      </Link>{" "}
      <span className="text-gray-500">(via {props.sellCampaign.id})</span>
    </div>
    {props.transaction ? <BuyerInfo transaction={props.transaction} /> : null}
  </>
);

const BuyerInfo = (props) => (
  <>
    <div>
      Buyer:{" "}
      <Link
        to={`/clients/${props.transaction.buy_campaign.client_id}`}
        className="underline"
      >
        {props.transaction.buy_campaign.client.name}
      </Link>{" "}
      <span className="text-gray-500">
        (via {props.transaction.buy_campaign.id})
      </span>
    </div>
    <div>
      Transaction: {props.transaction.id} created at{" "}
      {props.transaction.created_at}
    </div>
  </>
);

export default Lead;
