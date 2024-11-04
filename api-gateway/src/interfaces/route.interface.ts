export interface Route {
    method: string;
    path: string;
    target: string;
    auth?: boolean;
}