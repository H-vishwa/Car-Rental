import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "dummy_public_key",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "dummy_private_key",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/dummy",
});

const imagekit = {
  ...client,
  client,
  upload: (options) => client.files.upload(options),
  url: ({ path, transformation, ...rest } = {}) => {
    return client.helper.buildSrc({
      src: path || "",
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      transformation,
      ...rest,
    });
  },
};

export default imagekit;
