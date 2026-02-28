/**
 * .env.dev
 */

import type { Env } from "@/interface/env";

const ENV: Env = {
  // secret_key: '0cf5516973a145929ff36d3303183e5f',
  secret_key: "31c2d699735340f78bcd97cb0abe1d26",
  merchant: "https://api.merchant.vn/v1",
  contact: "https://api-contact.merchant.vn",

  VITE_MEDIA_CDN: "https://cdn.botbanhang.vn",
};

export default ENV;
