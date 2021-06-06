import {Router} from "express";

class AppRoutes
{

    public routes: Router;

    constructor()
    {
        this.routes = Router();
        this.constructRouteSettings();
    }

    private constructRouteSettings()
    {
        this.routes.get(
            '/', (req, res) =>
            {
                console.log("GET: \'New user accessing on port\'");
                res.send("Routes built ...ok");
            }
        )
    }
}

const appRoutes = new AppRoutes().routes;
export { appRoutes }