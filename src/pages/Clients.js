import { getClients } from "common/requests/clients";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  const getClientDataWithBalances = async () => {
    const [success, data] = await getClients();

    if (success) {
      setClients(data);
    }
  };

  useEffect(() => {
    getClientDataWithBalances();
  }, []);

  return (
    <div className="flex flex-col">
      <table>
        <thead>
          <tr>
            <th className="text-left">Status</th>
            <th className="text-left">Name</th>
            <th className="text-left">Rego</th>
            <th className="text-right">Balance</th>
            <th className="text-left pl-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="">
              <td>{client.status}</td>
              <td>{client.name}</td>
              <td>{client.reg_number}</td>
              <td className="text-right">{client.balance}</td>
              <td className="pl-2">
                <Link to={`/clients/${client.id}`}>
                  See transactions, Add/withdraw money
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsPage;
