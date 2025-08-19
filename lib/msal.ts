// "use client" is NOT needed here (this module is imported by client components)
import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from "@/authConfig" // we’ll keep your config file (see section 3)

export const msalInstance = new PublicClientApplication(msalConfig)
