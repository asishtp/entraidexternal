"use client"

import { useMemo } from "react"
import { createClaimsTable } from "@/utils/claimUtils"

type Claims = Record<string, unknown> | null | undefined

const IMPORTANT = new Set(["name", "preferred_username", "emails", "oid", "tid", "sub", "iss", "aud", "exp", "iat", "nbf"])

function isEpochish(k: string) {
  return k === "exp" || k === "iat" || k === "nbf"
}

function formatMaybeEpoch(key: string, value: string) {
  if (!isEpochish(key)) return value
  const n = Number(value)
  if (!Number.isFinite(n)) return value
  const iso = new Date(n * 1000).toISOString()
  return `${value}  (${iso})`
}

export function IdTokenData({ idTokenClaims }: { idTokenClaims?: Claims }) {
  const tokenClaims = useMemo(() => createClaimsTable(idTokenClaims ?? null), [idTokenClaims])

  const keys = useMemo(() => {
    const all = Object.keys(tokenClaims)
    // sort: important first (keep their relative order), then the rest alpha
    const imp = all.filter((k) => IMPORTANT.has(k))
    const rest = all.filter((k) => !IMPORTANT.has(k)).sort((a, b) => a.localeCompare(b))
    return [...imp, ...rest]
  }, [tokenClaims])

  if (keys.length === 0) {
    return <p style={{ padding: 16 }}>No ID token claims available yet.</p>
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <table
        aria-label="ID token claims"
        style={{ borderCollapse: "collapse", width: "95%" }}
        border={1}
        cellPadding={8}
      >
        <thead>
          <tr>
            <th align="left">Claim</th>
            <th align="left">Value</th>
            <th align="left">Description</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => {
            const row = tokenClaims[key]
            // row is ["claim", "value", "description"]
            const claim = row?.[0] ?? key
            const value = formatMaybeEpoch(key, row?.[1] ?? "")
            const desc  = row?.[2] ?? ""
            return (
              <tr key={key}>
                <td style={{ fontWeight: IMPORTANT.has(key) ? 600 : 400 }}>{claim}</td>
                <td style={{ wordBreak: "break-word", maxWidth: 540 }}>{value}</td>
                <td style={{ color: "#555" }}>{desc}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
