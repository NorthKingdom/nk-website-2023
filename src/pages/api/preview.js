// // api/preview.js
// import {
//   getCaseData,
//   getCollectionData,
//   getHomePage,
//   getJournalEntries,
//   getAboutPage,
//   getCollectionsPage,
// } from "@utils/scrubData";
// import { ROUTE_FIELDS } from "@constants";

// export default async (req, res) => {
//   if (
//     req.query.secret !== process.env.NEXT_PUBLIC_CTF_PREVIEW_TOKEN ||
//     !req.query.slug
//   ) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
//   const routeParams = req.query.slug.split("/");
//   const contentType = routeParams[1] === "" ? "home" : routeParams[1];
//   const contentTitle = routeParams[2];

//   let post = null;
//   let url = null;

//   switch (contentType) {
//     case "home":
//       post = await getHomePage(true);
//       url = `/`;
//       break;
//     case "case":
//       post = await getCaseData(contentTitle, true);
//       url = `/${contentType}/${
//         post.slug ? post.slug : post[ROUTE_FIELDS[contentType]]
//       }`;
//       break;
//     case "collection":
//       post = await getCollectionData(contentTitle, true);
//       url = `/${contentType}/${
//         post.slug ? post.slug : post[ROUTE_FIELDS[contentType]]
//       }`;
//       break;
//     case "about":
//       post = await getAboutPage(true);
//       url = `/about`;
//       break;
//     case "work":
//       post = await getCollectionsPage(true);
//       url = `/work`;
//       break;
//     case "journal":
//       post = await getJournalEntries(0, true);
//       url = `/journal`;
//       break;
//     default:
//       console.log(`CANT FIND DATA IN CONTENTFUL FOR TYPE: ${contentType}`);
//   }

//   if (!post) {
//     return res.status(401).json({ message: "Invalid slug" });
//   }

//   try {
//     res.setPreviewData({
//       preview: true,
//       params: {
//         contentType: contentType,
//         title: post[ROUTE_FIELDS[contentType]],
//       },
//     });
//   } catch (e) {
//     console.log(`ERR : On set preview data`);
//     console.log(e.message);
//     console.log(e.stack);
//   }

//   res.write(
//     `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
//     <script>window.location.href = '${url}'</script>
//     </head>`
//   );
//   res.end();
// };
