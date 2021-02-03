import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const Dashboard = () => (
  <div className="flex flex-row">
    <div className="flex-1 mt-5 ml-6 mr-3">
      <div className="rounded border border-gray-100 bg-white px-3 py-1">
        <div className="text-lg font-semibold uppercase tracking-wide">
          Sell statistics
        </div>
        <div className="text-sm text-gray-500">
          This Week Performance (Monday ⟶ Today)
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-blue-400 mr-2" />
          <div className="w-1/4">Uploaded</div>
          <div>
            50 leads <span className="italic">(min $100)</span>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-red-500 mr-2" />
          <div className="w-1/4">Retired</div>
          <div>
            5 leads <span className="italic">($10)</span>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-yellow-500 mr-2" />
          <div className="w-1/4">On Sale</div>
          <div>
            10 leads <span className="italic">(min $20)</span>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-green-500 mr-2" />
          <div className="w-1/4">Sold</div>
          <div>
            35 leads ⟶ <span className="font-semibold">$125</span>
          </div>
        </div>

        <div className="my-2">
          <hr />
        </div>
        <div className="flex flex-row items-center mt-1">
          <div className="mr-2 opacity-40">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="text-sm text-gray-500">Updated 15 mis ago</div>
        </div>
      </div>
    </div>

    <div className="flex-1 mt-5 ml-3 mr-6">
      <div className="rounded border border-gray-100 bg-white px-3 py-1">
        <div className="text-lg font-semibold uppercase tracking-wide">
          Buy statistics
        </div>
        <div className="text-sm text-gray-500">
          This Week Performance (Monday ⟶ Today)
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-blue-400 mr-2" />
          <div>2 campaigns running</div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-white mr-2" />
          <div>
            <span className="italic">0 campaigns out of budget</span>
          </div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-yellow-500 mr-2" />
          <div className="w-1/4">Budget Left</div>
          <div>$421, 83%</div>
        </div>

        <div className="flex flex-row items-center mt-1">
          <div className="rounded-full h-4 w-4 bg-green-500 mr-2" />
          <div className="w-1/4">Bought</div>
          <div>
            18 leads ⟶ <span className="font-semibold">$96</span>
          </div>
        </div>

        <div className="my-2">
          <hr />
        </div>
        <div className="flex flex-row items-center mt-1">
          <div className="mr-2 opacity-40">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="text-sm text-gray-500">Updated 15 mis ago</div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
