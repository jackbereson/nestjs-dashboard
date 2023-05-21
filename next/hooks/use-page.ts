import { useRouter } from "next/router";
import { PageData } from "../lib/models/page-data.model";
import { pagesData } from "../shared/pages-data";

const usePage = (): PageData => {

    const router = useRouter();

    let pageData: PageData = {
        code: "",
        title: "DC8",
        description:
            "",
        url: "https://dashboard.dc8.io",
        image: "https://dashboard.dc8.io/images/bg.jpeg",
    };

    if (router.query.slug) {
        pageData = pagesData.find(({ code }) => code === router.query.slug);
    } else {
        pageData = pagesData.find(({ url }) => url === router.pathname);
    }

    return pageData;
};


export default usePage;


    // const origin =
    //   typeof window !== "undefined" && window.location.origin
    //     ? window.location.origin
    //     : "";
    // console.log('origin',origin);