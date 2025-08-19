"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMsal } from "@azure/msal-react"
import type { AuthenticationResult } from "@azure/msal-browser"

export default function RedirectPage() {
  const { instance } = useMsal()
  const router = useRouter()

  useEffect(() => {
    let ignore = false

    ;(async () => {
      // Process the auth code -> tokens & cache
      const result = (await instance.handleRedirectPromise()) as AuthenticationResult | null

      // Prefer the account from the redirect result (freshest)
      const account = result?.account ?? instance.getActiveAccount() ?? instance.getAllAccounts()[0] ?? null
      if (account && !ignore) {
        instance.setActiveAccount(account)
      }

      // Send the user back to where you want them (home here)
      router.replace("/")
    })()

    return () => { ignore = true }
  }, [instance, router])

  return <p style={{ padding: 16 }}>Finalising sign-in…</p>
}
