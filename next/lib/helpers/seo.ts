// import { SettingModel } from "../../../dist/graphql/modules/setting/setting.model";

export default async function SEO(
  title: string,
  data: { description?: string; image?: string } = {}
) {
  // const seoSettings = await SettingModel.find(
  //   {
  //     key: { $in: ["SEO_DESCRIPTION", "SEO_IMAGE", "SEO_KEYWORDS"] },
  //   },
  //   "_id key value"
  // );
  // const seoData = seoSettings.reduce(
  //   (data, setting) => ({ ...data, [setting.key]: setting.value }),
  //   {}
  // );
  return {
    // title,
    // description: data.description || seoData["SEO_DESCRIPTION"],
    // image: data.image || seoData["SEO_IMAGE"],
    // openGraph: {
    //   images: [
    //     {
    //       url: data.image || seoData["SEO_IMAGE"],
    //     },
    //   ],
    // },
    // additionalMetaTags: [
    //   {
    //     property: "keywords",
    //     contetn: seoData["SEO_KEYWORDS"],
    //   },
    // ],
  };
}
