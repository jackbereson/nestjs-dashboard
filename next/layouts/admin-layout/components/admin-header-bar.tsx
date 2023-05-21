import Link from "next/link";
import NextIcon from "../../../components-shared/next-icon";
import useAuth from "../../../hooks/use-auth";
import { classNames } from "../../../lib/helpers/design";
import { UserRole } from "../../../lib/modules/user/user.model";
import { useWeb3js } from "../../../providers/web3-provider";

const AdminHeaderBar = () => {
  const auth = useAuth();
  const { currentAccount } = useWeb3js();

  const Wrapper = (props) => (
    <div
      className={classNames(
        "bg-seconds-dark",
        "z-100 fixed top-0 text-white w-full border-b border-primary shadow",
        props.classNames
      )}
    >
      {props.children}
    </div>
  );

  if (!auth) {
    <Wrapper>Loading...</Wrapper>;
  }
  return (
    auth && (
      <Wrapper classNames="flex">
        <Link href="/profile">
          <a className="px-2 py-1 hover:bg-primary flex gap-2">
            <NextIcon name="FcAssistant" className="text-xl" /> {auth.role}
          </a>
        </Link>
        {auth.role === UserRole.ADMIN && (
          <a
            className="px-2 py-1 hover:bg-primary flex gap-2"
            href="https://demo.dc8.net"
            target="_blank"
          >
            <NextIcon name="FcBrokenLink" className="text-xl" /> URL: DC8
          </a>
        )}
        {auth.role === UserRole.ADMIN && currentAccount && (
          <div className="px-2 py-1 hover:bg-primary flex gap-2">
            <NextIcon name="FcBrokenLink" className="text-xl" /> {currentAccount}
          </div>
        )}
        {auth.role === UserRole.MEMBER && (
          <a
            className="px-2 py-1 hover:bg-primary flex gap-2"
            href={`https://demo.dc8.net/agent/${auth.referralCode}`}
            target="_blank"
          >
            <NextIcon name="FcBrokenLink" className="text-xl" /> Agency URL: DC8/agent/
            {auth.referralCode}
          </a>
        )}
      </Wrapper>
    )
  );
};

export default AdminHeaderBar;
