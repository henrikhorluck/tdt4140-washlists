/* eslint no-undef:0, @typescript-eslint/no-var-requires:0 */

module.exports = () => {
  // For OAuth authentication
  const client_id =
    process.env.SIF_BACKEND_CLIENT_ID ||
    "SLDhkx2m08A3c357d4WihIWGzcUQ4duc0TeWhUGL";
  const client_secret =
    process.env.SIF_BACKEND_CLIENT_SECRET ||
    "XA1f55cdS3UVmX5bk5Rjb9kqMV4v79a2gATGcvehoXR9BAMkjlda8KA0pTiBtBa2k5LAuxGNTJmQVrp8GaCs7P2IQ146f5KIzFmNOOcNz6sgqIeEYllKyDU2RbcoeFwX";

  // For domain-independent application, NOTE: without trailing slash
  const backend_domain =
    process.env.SIF_BACKEND_DOMAIN || "http://localhost:8000";
  const domain = process.env.SIF_DOMAIN || "http://localhost:3000";

  return {

    env: {
      CLIENT_ID: client_id,
      CLIENT_SECRET: client_secret,
      BACKEND_DOMAIN: backend_domain,
      DOMAIN: domain
    }
  };
};
