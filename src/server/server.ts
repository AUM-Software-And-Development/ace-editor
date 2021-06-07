import "./config/config.ts";
import * as _express_ from "express";
import * as _bodyparser_ from "body-parser";

const PORT = 3000;

class ExpressApp
{

    public app: _express_.Application;

    constructor(){
        this.app = _express_();
        this.constructAppSettings();
    }

    private constructAppSettings(): void {
        this.app.use(_bodyparser_.json());
        this.app.use(_bodyparser_.urlencoded({ extended: false }));
    }
}

const app = new ExpressApp().app;

import { appRoutes } from "./routes/app.routes"

app.use(appRoutes); /* Align routes */

app.listen(
    process.env.PORT || PORT, () => 
    {
    console.log("Server is valid using port#", PORT);
    }
)