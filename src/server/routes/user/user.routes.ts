import { Router } from "express";

class UserRoutes
{
    public routes: Router;

    constructor()
    {
        this.routes = Router();
        this.constructUserRoutesConfig();
    }

    private constructUserRoutesConfig()
    {
        this.routes.get(
            "/", (req, res) =>
        {}
        );
        this.routes.post(
            "/", (req, res) =>
        {}
        );
        this.routes.get(
            "/", (req, res) =>
        {}
        );
    }
}

const userRoutes = new UserRoutes().routes;
export { userRoutes }