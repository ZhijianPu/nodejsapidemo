module.exports = {
    CTUDATABASE: {
		host: process.env.POSTGRESQL_CTU_HOST || '',
        user: process.env.POSTGRESQL_CTU_USER || '',
        password: process.env.POSTGRESQL_CTU_PASSWORD || ``,
        database: process.env.POSTGRESQL_CTU_DATABASE || '',
		port: process.env.POSTGRESQL_CTU_PORT || '5432',
        max: 20, // max number of connection can be open to database
        idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
    }, 
    WUXDATABASE: {
		host: process.env.POSTGRESQL_WUX_HOST || '',
        user: process.env.POSTGRESQL_WUX_USER ||'',
        password: process.env.POSTGRESQL_WUX_PASSWORD || ``,
        database: process.env.POSTGRESQL_WUX_DATABASE || '',
		port: process.env.POSTGRESQL_WUX_PORT || '5432',
        max: 20, // max number of connection can be open to database
        idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
    },  
    ssoTokenAddr: process.env.SSO_TOKEN_ADDR || 'http://localhost:3030',
    ssoTokenPath: process.env.SSO_TOKEN_PATH || '/api/v1/user/token',
}