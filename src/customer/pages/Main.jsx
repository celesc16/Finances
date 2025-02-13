import BalanceCard from "../components/Card/BalanceCard";
import Dounut from "../components/chart/Dounut";

function Main() {
  return (
    <div className="p-6 sm:ml-64 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mt-14">
      <BalanceCard />
      <div className="flex-grow lg:w-1/2 xl:w-1/3">
        <Dounut />
      </div>
    </div>
  );
}

export default Main;
