export interface ITokenData {
    token: string;
    expiresIn: number;
}

export interface ITokenPayload {
    userId: string;
    email: string;
    iat?: number;
    exp?: number;
}

export interface IDecodedToken {
    userId: string;
    email: string;
    iat: number;
    exp: number;
}

export interface ITokenResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    user: {
        id: string;
        email: string;
        username: string;
    };
}

export interface IRefreshTokenData {
    refreshToken: string;
    expiresIn: number;
}