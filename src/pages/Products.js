import { createProduct, getProducts } from "common/requests/products";
import { useEffect, useState } from "react";

import LoadingSpinner from "common/components/LoadingSpinner";

const Products = () => {
  const [data, setData] = useState([]);

  const loadProducts = async () => {
    const [success, data] = await getProducts();

    if (success) {
      setData(data);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div>Current products</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <AddForm refresh={loadProducts} />
      </div>
    </div>
  );
};

const AddForm = (props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);

    const [success] = await createProduct(name);

    if (success) {
      props.refresh();
      setName("");
    }

    setLoading(false);
  };

  return (
    <>
      Add product:{" "}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-72 border border-gray-400 rounded"
      ></input>{" "}
      →{" "}
      <button
        type="submit"
        disabled={loading}
        className="w-20 border rounded border-purple-300 px-2 hover:bg-purple-300"
        onClick={onSave}
      >
        {loading ? <LoadingSpinner /> : "Save"}
      </button>
    </>
  );
};
export default Products;
