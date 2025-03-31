export type Key = {
    kid: string,
    privateKey: string,
    publicKey: string
}

export type JwtKey = Omit<Key, 'publicKey'>;
