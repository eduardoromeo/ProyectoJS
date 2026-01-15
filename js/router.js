import { renderDashboardPage  } from "./pages/dhashboard.js";
import { renderProductsPage } from "./pages/product.js";
import { renderAboutPage } from "./pages/about.js";
import { renderMisionPage } from "./pages/mision.js";
import { renderVisionPage } from "./pages/vision.js";

const routes ={
    dashboard: renderDashboardPage,
    products: renderProductsPage,
    about: renderAboutPage
}

// Añadir las nuevas rutas
routes.mision = renderMisionPage;
routes.vision = renderVisionPage;

export class Router{
    constructor(root){
        this.root = root
    }
    navigate(pageName){
        const pageFn=routes[pageName]
        if(pageFn){
            this.root.innerHTML = "";
            pageFn(this.root)
        } else {
            this.root.innerHTML = "<p> Página no encontrada</p>"
        }

    }
}