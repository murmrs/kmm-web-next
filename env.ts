import { createEnv } from "@t3-oss/env-nextjs"; // or core package
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {},
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_TYPESENSE_HOST: z.string().min(1),
    NEXT_PUBLIC_TYPESENSE_API_KEY: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_TYPESENSE_HOST: process.env.NEXT_PUBLIC_TYPESENSE_HOST,
    NEXT_PUBLIC_TYPESENSE_API_KEY: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
  },
});
