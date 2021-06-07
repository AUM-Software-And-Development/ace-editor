import {Router} from "express";
import {userRoutes} from "./user/user.routes";
import {itemsRoutes} from "./items/items.routes";

class AppRoutes
{

    public routes: Router;

    constructor()
    {
        this.routes = Router();
        this.constructAppRoutesConfig();
    }

    
    private constructAppRoutesConfig()
    {
        this.routes.get(
            "/", (req, res) =>
            {
                this.routes.use("/user", userRoutes);
                this.routes.use("/items", itemsRoutes);
            }
        )
    }
}

const appRoutes = new AppRoutes().routes;
export { appRoutes }