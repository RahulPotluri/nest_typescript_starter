const config = {
    env: process.env.ENVIRONMENT,
    secretKey: process.env.SECRET_KEY,
    dbConfig: {
        username: '',
        host: "localhost",
        database: "football",
        port: 27017
    },
    log: {
        format: "dev",
        dir: "../logs"
    }
}

export default config;