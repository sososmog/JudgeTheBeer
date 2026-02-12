// 使用 Web Crypto API 进行密码哈希（兼容 Cloudflare Workers）

// 生成随机盐值
function generateSalt(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('')
}

// 将字符串转为 ArrayBuffer
function stringToBuffer(str: string): ArrayBuffer {
  return new TextEncoder().encode(str)
}

// 将 ArrayBuffer 转为十六进制字符串
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), b => b.toString(16).padStart(2, '0')).join('')
}

// 使用 PBKDF2 哈希密码
async function pbkdf2Hash(password: string, salt: string): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    stringToBuffer(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: stringToBuffer(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  )

  return bufferToHex(derivedBits)
}

// 加密密码（返回 salt:hash 格式）
export async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt()
  const hash = await pbkdf2Hash(password, salt)
  return `${salt}:${hash}`
}

// 验证密码
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':')
  if (!salt || !hash) return false
  
  const computedHash = await pbkdf2Hash(password, salt)
  return computedHash === hash
}