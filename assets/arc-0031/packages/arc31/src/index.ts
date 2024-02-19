import { encode, decode } from '@msgpack/msgpack'

export interface AuthMessage {
  /** The domain name of the Verifier */
  domain: string
  /** Algorand account to authenticate with */
  authAcc: string
  /** Unique random nonce generated by the Verifier */
  nonce: string
  /** Optional, description of the Verifier */
  desc?: string
  /** Optional, metadata */
  meta?: string
}

export const encodeAuthMessage = (authMessage: AuthMessage): string =>
  `AX${Buffer.from(encode({ 'arc31:j': authMessage })).toString('base64')}`

export const decodeAuthMessage = (encodedAuthMessage: string): AuthMessage => {
  const decodedMessage = decode(Buffer.from(encodedAuthMessage.replace(/^AX/, ''), 'base64')) as { 'arc31:j': AuthMessage }

  return decodedMessage['arc31:j']
}
