"use client"

import { useEffect } from "react"
import { useMsal } from "@azure/msal-react"
import { useRouter } from "next/navigation"

export default function ProtectedPage() {
  const { instance } = useMsal()
  const router = useRouter()
  const account = instance.getActiveAccount()

  useEffect(() => {
    if (!account) {
      // not signed in → send to home (or call loginRedirect here if you prefer)
      router.replace("/")
    }
  }, [account, router])

  if (!account) return <p style={{ padding: 16 }}>Checking sign-in…</p>

  return (
    <main style={{ padding: 24 }}>
      <h1>Protected</h1>
      <p>You are signed in. Here are your ID token claims:</p>
      <pre>{JSON.stringify(account.idTokenClaims, null, 2)}</pre>
    </main>
  )
}
