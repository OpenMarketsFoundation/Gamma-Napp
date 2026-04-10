const PUBKEY_B36_LEN = 50

const normalizeName = (value) => {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
}

const hexToBase36 = (hex) => {
  const clean = String(hex || '').trim().toLowerCase()
  if (!/^[0-9a-f]{64}$/.test(clean)) {
    throw new Error('Invalid merchant pubkey for named nsite URL.')
  }

  return BigInt(`0x${clean}`).toString(36).padStart(PUBKEY_B36_LEN, '0')
}

export const buildNamedNsiteUrl = ({ pubkey, name, gateway }) => {
  const safeName = normalizeName(name)
  if (!safeName) {
    throw new Error('Missing named nsite identifier.')
  }

  const base36 = hexToBase36(pubkey)
  const domain = String(gateway || '').trim().toLowerCase()
  if (!domain) {
    throw new Error('Missing gateway domain.')
  }

  return `https://${base36}${safeName}.${domain}`
}
