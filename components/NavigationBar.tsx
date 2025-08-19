"use client"

import Link from "next/link"
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"

export default function NavigationBar() {
  const { instance } = useMsal()

  const signIn = () => instance.loginRedirect().catch(console.error)
  const signOut = () => instance.logoutRedirect().catch(console.error)

  return (
    <nav style={{ background: "#0d6efd", color: "#fff", padding: "8px 16px", display: "flex", gap: 16, alignItems: "center" }}>
      <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
        Microsoft identity platform
      </Link>

      {/* Only show when authenticated */}
      <AuthenticatedTemplate>
        <Link href="/protected" style={{ color: "#fff", textDecoration: "underline" }}>
          Protected
        </Link>
      </AuthenticatedTemplate>

      <div style={{ marginLeft: "auto" }}>
        <AuthenticatedTemplate>
          <button onClick={signOut} style={{ marginLeft: 8 }}>Sign out</button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <button onClick={signIn} style={{ marginLeft: 8 }}>Sign in</button>
        </UnauthenticatedTemplate>
      </div>
    </nav>
  )
}
