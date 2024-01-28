import { Client } from "@gadget-client/new-promotion-app";

export const api = new Client({ environment: window.gadgetConfig.environment });
