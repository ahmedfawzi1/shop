declare namespace NodeJS{
    interface ProcessEnv{
        readonly PORT:number;
        readonly DB:string;
        readonly NODE_ENV:string;
        readonly BASE_URL:string
        readonly JWT_KEY:string
        readonly JWT_EXPIRE:string
        readonly JWT_RESET_KEY:string
        readonly JWT_RESET_EXPIRE:string
        readonly EMAIL_HOST: string;
        readonly EMAIL_USERNAME: string;
        readonly EMAIL_PASSWORD: string;
        readonly APP_NAME: string;
        readonly clientID:string ,
        readonly clientSecret: string,
        readonly callbackURL: string
}
}