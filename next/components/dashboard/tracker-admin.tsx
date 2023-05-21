import CardBarChart from "./card-bar-chart";
import CardLineChart from "./card-line-chart";
import CardPageVisits from "./card-page-visits";
import CardSocialTraffic from "./card-social-traffic";

const TrackerAdmin = () => {
  return (
    <div className="px-4 md:px-2 mx-auto w-full -mt-28">
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </div>
  );
};

export default TrackerAdmin;