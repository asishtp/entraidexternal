import { LogLevel, type Configuration } from "@azure/msal-browser"

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
    authority: process.env.NEXT_PUBLIC_AZURE_AUTHORITY!, // e.g. https://yourtenant.ciamlogin.com/
    knownAuthorities: [new URL(process.env.NEXT_PUBLIC_AZURE_AUTHORITY!).host],
    redirectUri: process.env.NEXT_PUBLIC_AZURE_REDIRECT_URI!,        // e.g. http://localhost:3000/redirect
    postLogoutRedirectUri: process.env.NEXT_PUBLIC_AZURE_POST_LOGOUT_REDIRECT_URI || "/",
    navigateToLoginRequestUrl: false, // avoids bouncing back to pre-login URL on first sign-in
  },
  cache: {
    cacheLocation: "localStorage",    // persist across refresh
    storeAuthStateInCookie: false,    // set true only if you must support old IE
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return
        switch (level) {
          case LogLevel.Error:   console.error(message); break
          case LogLevel.Warning: console.warn(message);  break
          case LogLevel.Info:    console.info(message);  break
          case LogLevel.Verbose: console.debug(message); break
        }
      },
    },
  },
}

export const loginRequest = { scopes: ["openid", "profile", "email"] }
