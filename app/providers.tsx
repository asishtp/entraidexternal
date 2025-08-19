"use client"

import { useEffect, useState } from "react"
import { MsalProvider } from "@azure/msal-react"
import { EventType, AuthenticationResult } from "@azure/msal-browser"
import { msalInstance } from "@/lib/msal"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cbId: string | null = null

    ;(async () => {
      await msalInstance.initialize()

      // Restore from cache on hard refresh
      const accounts = msalInstance.getAllAccounts()
      if (!msalInstance.getActiveAccount() && accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0])
      }

      // Keep active account synced after interactive login
      cbId = msalInstance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS) {
          const result = event.payload as AuthenticationResult
          if (result?.account) msalInstance.setActiveAccount(result.account)
        }
      })

      setReady(true)
    })()

    return () => { if (cbId) msalInstance.removeEventCallback(cbId) }
  }, [])

  if (!ready) return <div style={{ padding: 16 }}>Loading identity…</div>

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}
