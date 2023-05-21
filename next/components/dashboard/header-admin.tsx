import CardStats from "./card-stats";

const HeaderAdmin = () => {
  return (
    <div className="relative bg-primary-dark pb-32 pt-10">
      <div className="px-4 md:px-2 mx-auto w-full">
        <div>
          {/* Card stats */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="TRAFFIC"
                statTitle="350,897"
                statArrow="up"
                statPercent="3.48"
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName="FcAutomotive"
                statIconColor="bg-red-100"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="NEW USERS"
                statTitle="2,356"
                statArrow="down"
                statPercent="3.48"
                statPercentColor="text-red-500"
                statDescripiron="Since last week"
                statIconName="FcAutomotive"
                statIconColor="bg-green-100"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="SALES"
                statTitle="924"
                statArrow="down"
                statPercent="1.10"
                statPercentColor="text-orange-500"
                statDescripiron="Since yesterday"
                statIconName="FcCableRelease"
                statIconColor="bg-pink-100"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="PERFORMANCE"
                statTitle="49,65%"
                statArrow="up"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName="FcComboChart"
                statIconColor="bg-blue-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
