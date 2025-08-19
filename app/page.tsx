"use client"
import { useEffect } from "react"
import { useMsal } from "@azure/msal-react"
import { loginRequest } from "@/authConfig"
import NavigationBar from "@/components/NavigationBar"
import { IdTokenData } from "@/components/IdTokenData"

export default function HomePage() {
  const { instance } = useMsal()
  const account = instance.getActiveAccount()

  useEffect(() => {
    if (!account) {
      const a = instance.getAllAccounts()[0]
      if (a) instance.setActiveAccount(a)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignUp = () => {
    instance.loginRedirect({ ...loginRequest, prompt: "create" }).catch(console.error)
  }

  return (
    <div>
      <NavigationBar />
      <main style={{ padding: 16 }}>
        {account ? (
          <IdTokenData idTokenClaims={account.idTokenClaims as any ?? null} />
        ) : (
          <button onClick={handleSignUp}>Sign up</button>
        )}
      </main>
    </div>
  )
}
