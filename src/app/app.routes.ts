import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "products/electronics"
    },
    {
        path: "products/:id",
        loadComponent: () => import("./components/products/products.component").then(c => c.ProductsComponent)
    },
    {
        path: "cart",
        loadComponent: () => import("./components/cart/cart.component").then(c => c.CartComponent),
    },
    {
        path: "detail",
        loadComponent: () => import("./components/product-detail/product-detail.component").then(c => c.ProductDetailComponent)
    },
    {
        path: "profile",
        loadComponent: () => import("./components/profile-page/profile-page.component").then(c => c.ProfilePageComponent)
    }
];
