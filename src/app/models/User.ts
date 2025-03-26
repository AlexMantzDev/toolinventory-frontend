export interface User {
    sub: number,
    role: string,
    iat: number,
    scope: string,
    email: string,
    version: number,
    exp: number
}