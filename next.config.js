module.exports = {
  basePath: "",

  async rewrites() {
    return [
      {
        source: "/cms",
        destination: `${process.env.CMS_HOST_URL}`,
      },
    ];
  },
};
