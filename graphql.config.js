module.exports = {
  projects: {
    db: {
      schema: "/nest/src/**/*.graphql",
      extensions: {
        endpoints: {
          default: {
            url: "http://localhost:4001/graphql",
            headers: {
              access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNNSWZXVHh4UzMrREpEc0pGdmdJaHciLCJpYXQiOjE2NDQzMDA0NzUsImV4cCI6MTk1OTY2MDQ3NX0.3hqv0r1doOTq6VwfebGGNUD0fR58qAtLK3ayZK0LytQ`,
            },
          },
        },
      },
    },
  }
};
