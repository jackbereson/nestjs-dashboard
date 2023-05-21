import expressLoader from "./express";
export default ({ expressApp }: any) => {
  expressLoader({ app: expressApp });
};

