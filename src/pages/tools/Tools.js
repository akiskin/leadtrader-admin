import { releaseLock } from "common/requests/tools";

const Tools = () => (
  <div className="w-full">
    <ReleaseLock />
  </div>
);

const ReleaseLock = () => {
  const handleCLick = async () => {
    await releaseLock();
  };

  return (
    <div>
      <div className="mb-1 h-8">
        <button
          onClick={handleCLick}
          className="border rounded border-gray-200 py-1 px-1 hover:bg-gray-200"
        >
          Release Fin Lock
        </button>
      </div>
    </div>
  );
};

export default Tools;
