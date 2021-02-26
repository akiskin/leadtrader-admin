import LoadingSpinner from "common/components/LoadingSpinner";
import { readableType } from "common/consts/transactions";
import {
  getClientDashboard,
  getClientTotalsAndTunrovers,
} from "common/requests/clients";
import { createTransaction } from "common/requests/transactions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ClientsPage = () => {
  const { id } = useParams();

  const [dashboardData, setDashboardData] = useState({});

  const getClientDataWithBalances = async (client_id) => {
    const [success, data] = await getClientDashboard(client_id);
    if (success) {
      setDashboardData(data);
    }
  };

  const [isLoadingTats, setIsLoadingTats] = useState(false);
  const [after, setAfter] = useState("");
  const [before, setBefore] = useState("");
  const [tats, setTats] = useState({});

  const getClientTransactionsAndBalances = async (client_id, after, before) => {
    setIsLoadingTats(true);
    const [success, data] = await getClientTotalsAndTunrovers(
      client_id,
      after,
      before
    );
    if (success) {
      setTats(data);
    }
    setIsLoadingTats(false);
  };

  const updateAllData = () => {
    getClientDataWithBalances(id);
    getClientTransactionsAndBalances(id, after, before);
  };

  useEffect(() => {
    getClientDataWithBalances(id);
    getClientTransactionsAndBalances(id, after, before);
  }, [id, after, before]);

  return (
    <div className="flex flex-col">
      <div className="my-1">
        Current balance:{" "}
        {"currentBalance" in dashboardData
          ? dashboardData.currentBalance
          : null}
      </div>
      <div className="my-1">
        <AddWithdrawMoney
          clientId={id}
          updater={updateAllData}
        ></AddWithdrawMoney>
      </div>

      <div>
        <div>
          <span className="font-semibold">Balances & Transactions</span> | From:{" "}
          <input
            type="date"
            value={after}
            onChange={(e) => setAfter(e.target.value)}
            className="border border-gray-400 rounded"
          ></input>{" "}
          before:{" "}
          <input
            type="date"
            value={before}
            onChange={(e) => setBefore(e.target.value)}
            className="border border-gray-400 rounded"
          ></input>
        </div>
        {isLoadingTats ? (
          <LoadingSpinner />
        ) : Object.keys(tats).length > 0 ? (
          <Tats data={tats} />
        ) : null}
      </div>

      <div className="mt-4 border-t-2">
        <Link to={"/clients"}>Back to clients list</Link>
      </div>
    </div>
  );
};

export default ClientsPage;

const AddWithdrawMoney = (props) => {
  const [amount, setAmount] = useState(0);
  const [reference, setReference] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const [success, data] = await createTransaction(
      props.clientId,
      amount,
      reference
    );

    if (success) {
      setAmount(0);
      setReference("");
      setLoading(false);

      props.updater();
    }
  };

  return (
    <div className="border rounded px-2 py-2">
      <div>
        Add (positive) or Witdraw (negative) amount to/from client balance
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          Amount:{" "}
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-400 rounded"
          ></input>{" "}
          Reference:{" "}
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="border border-gray-400 rounded"
          ></input>{" "}
          →{" "}
          <button
            type="submit"
            disabled={loading}
            className="w-20 border rounded border-purple-300 px-2 hover:bg-purple-300"
          >
            {loading ? <LoadingSpinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Tats = (props) => {
  return (
    <>
      <div>Opening balance: {props.data.startBalance}</div>
      <div>Closing balance: {props.data.endBalance}</div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-left">Type</th>
              <th className="text-right">Details</th>
              <th className="text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {props.data.transactions.map((t) => (
              <tr key={t.transaction_id}>
                <td>{t.period}</td>
                <td>{readableType(t.transaction.type)}</td>
                <td>{t.transaction.lead_id ?? t.transaction.reference}</td>
                <td>{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
