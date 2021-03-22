import LoadingSpinner from "common/components/LoadingSpinner";
import { readableStatus, readableAction } from "common/consts/leads";
import { inspectLead, resendLead } from "common/requests/leads";
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
        <div className="flex flex-col ml-2 space-y-2">
          {leadData ? (
            <DetailedData
              lead={leadData.raw}
              sellCampaign={leadData.sellCampaign}
              transaction={leadData.transaction}
              activities={leadData.activities}
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
    {props.transaction ? (
      <BuyerInfo transaction={props.transaction} leadId={props.lead.id} />
    ) : null}
    <ActivityLog data={props.activities} />
    {props.lead.status === 200 ? (
      <PurchaseDetails data={props.activities} />
    ) : null}
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
    <div>
      <ResendButton leadId={props.leadId} />
    </div>
  </>
);

const ResendButton = (props) => {
  const [loading, setLoading] = useState(false);

  const action = async () => {
    setLoading(true);

    await resendLead(props.leadId);

    setLoading(false);
  };

  return (
    <button
      type="submit"
      disabled={loading}
      className="border rounded border-purple-300 px-2 hover:bg-purple-300"
      onClick={action}
    >
      {loading ? <LoadingSpinner /> : "Resend data to buyer"}
    </button>
  );
};

const ActivityLog = (props) => (
  <>
    <div>
      <div className="font-semibold">
        Chronological list of actions performed
      </div>
      <table>
        <thead>
          <tr>
            <th className="font-semibold text-left">Date</th>
            <th className="font-semibold text-left pl-2">Action</th>
            <th className="font-semibold text-left pl-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.created_at}</td>
              <td className="pl-2">{readableAction(entry.action)}</td>
              <td className="pl-2">
                <div
                  title={JSON.stringify(entry.message)}
                  className="cursor-pointer"
                >
                  {"status" in entry.message
                    ? entry.message.status
                    : "(hover over)"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

const PurchaseDetails = (props) => (
  <div>
    <div className="font-semibold">Buy Rules at the moment of purchase</div>
    {props.data
      .filter((e) => e.action === 20)
      .map((e) => (
        <div key={e.id} className="bg-gray-200 text-xs py-2 px-2">
          <pre>{JSON.stringify(e.message.rules, null, 2)}</pre>
        </div>
      ))}
  </div>
);

export default Lead;
