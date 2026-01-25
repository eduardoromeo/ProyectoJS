import { renderDashboardPage  } from "./pages/dhashboard.js";
import { renderProductsPage } from "./pages/product.js";
import { renderAboutPage } from "./pages/about.js";
import { renderMisionPage } from "./pages/mision.js";
import { renderVisionPage } from "./pages/vision.js";
import { renderHomePage } from "./pages/home.js";

const routes ={
    home: renderHomePage,
    dashboard: renderDashboardPage,
    products: renderProductsPage,
    about: renderAboutPage,
    mision: renderMisionPage,
    vision: renderVisionPage
}

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