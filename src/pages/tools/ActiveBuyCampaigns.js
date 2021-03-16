import { useEffect, useState } from "react";
import { activeBuyCampaigns } from "common/requests/tools";

const ActiveCampaignsPage = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const [success, data] = await activeBuyCampaigns();

    if (success) {
      setData(data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th>Client</th>
              <th>Balance</th>
              <th>Campaign</th>
              <th>Budget</th>
              <th>Period</th>
              <th>Max Price</th>
              <th>Product</th>
              <th>Buy Rules</th>
            </tr>
          </thead>
          <tbody>
            {data.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-200">
                <td>
                  <div title={campaign.client.id}>{campaign.client.name}</div>
                </td>
                <td>
                  {campaign.client.balance ? campaign.client.balance.amount : 0}
                </td>
                <td>
                  <div title={campaign.id}>{campaign.name}</div>
                </td>
                <td>
                  {campaign.budget} - {campaign.budget_spent}
                </td>
                <td>
                  {campaign.start} - {campaign.finish}
                </td>
                <td>{campaign.max_price}</td>
                <td>
                  <div title={campaign.product.id}>{campaign.product.name}</div>
                </td>
                <td>
                  <div title={JSON.stringify(campaign.buy_rules, null, 2)}>
                    {JSON.stringify(campaign.buy_rules)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveCampaignsPage;
