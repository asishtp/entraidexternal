// utils/claimUtils.ts
export type ClaimsObject = Record<string, unknown>
export type ClaimsTable = Record<string, string[]>

export function createClaimsTable(claims?: ClaimsObject | null): ClaimsTable {
  const table: ClaimsTable = {}
  if (!claims || typeof claims !== "object") return table  // <- guard

  const describe = (claim: string): string => {
    const map: Record<string, string> = {
      sub: "Subject (unique identifier)",
      name: "User’s display name",
      preferred_username: "Username",
      emails: "Email addresses",
      oid: "Object ID",
      tid: "Tenant ID",
      iss: "Issuer",
      aud: "Audience",
      exp: "Expiry (epoch seconds)",
      iat: "Issued at (epoch seconds)",
      nbf: "Not before (epoch seconds)",
    }
    return map[claim] ?? ""
  }

  Object.entries(claims).forEach(([claim, value]) => {
    const serialised =
      value == null ? "" :
      Array.isArray(value) ? value.join(", ") :
      typeof value === "object" ? JSON.stringify(value) :
      String(value)

    table[claim] = [claim, serialised, describe(claim)]
  })

  return table
}
