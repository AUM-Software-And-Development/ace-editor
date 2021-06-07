class EnvConfig
{
    private environment = process.env.NODE_ENV || "dev";

    constructor()
    {
        this.constructEnvironmentConfig();
    }

    private constructEnvironmentConfig()
    {
        var _ENV_ = this.environment;
        function construct()
        {
                var config = require('./config.json');
                var envConfig = config[_ENV_];
                Object.keys(envConfig).forEach((key) => 
                {
                    process.env[key] = envConfig[key];
                });
        }        

        switch (this.environment)
        {
            case "dev":
                construct();
            break;

            case "test":
                construct();
            break;
        }
    }
}

export const serverEnvironment = new EnvConfig();