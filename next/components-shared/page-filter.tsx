import Link from "next/link";
import { useSelector } from "../redux/store";

const PageFilter = ({ url }: { url: string }) => {
  // const [lotteryReducer] = useSelector(({ lotteryReducer }) => [
  //   lotteryReducer,
  // ]);
  return (
    <></>
    // lotteryReducer.lotteries.length > 0 && (
    //   <>
    //     <div className="lg:hidden text-xs text-center col-span-4 grid grid-cols-5 gap-1 my-2">
    //       {lotteryReducer.lotteries.map((lotto, k) => {
    //         return (
    //           <Link href={`/${url}${lotto.code}`} key={k}>
    //             <a className="border rounded flex items-center justify-center p-1">
    //               {lotto.name}
    //             </a>
    //           </Link>
    //         );
    //       })}
    //       <Link href={`/${url}`}>
    //         <a className="border rounded flex items-center justify-center p-1">
    //           All
    //         </a>
    //       </Link>
    //     </div>
    //     <div className="hidden text-xs text-center col-span-4 lg:grid grid-cols-5">
    //       {lotteryReducer.lotteries.map((lotto, k) => {
    //         return (
    //           <Link href={`/${url}${lotto.code}`} key={k}>
    //             <a className="mr-1">{lotto.code}</a>
    //           </Link>
    //         );
    //       })}
    //       <Link href={`/${url}`}>
    //         <a className="mr-1">all</a>
    //       </Link>
    //     </div>
    //   </>
    // )
  );
};

export default PageFilter;