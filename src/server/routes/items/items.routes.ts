import { Router } from "express";

class ItemsRoutes
{
    public routes: Router;

    constructor()
    {
        this.routes = Router();
        this.constructItemsRoutesConfig();
    }

    private constructItemsRoutesConfig()
    {
        this.routes.get(
            "/", (req, res) =>
        {}
        );
    }
}

const itemsRoutes = new ItemsRoutes().routes;
export { itemsRoutes }