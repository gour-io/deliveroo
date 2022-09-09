import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "8zo5kodh",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-09-05",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// RUN this to add exception for localhost 3000 CORS policy
//  sanity cors add http://localhost:3000

export default client;
