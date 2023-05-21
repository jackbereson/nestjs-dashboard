import NextIcon, { FCIcons } from "../../components-shared/next-icon";

const StatItem = ({ name, value }: { name: string; value: number }) => {
  return (
    <p className="text-sm text-primary-dark mt-4 flex gap-2 items-center">
      <NextIcon name={FCIcons.FcAdvertising} className="" />
      <span>{name}</span> {" : "}
      <span>{value}</span>
    </p>
  );
};

export default StatItem;
