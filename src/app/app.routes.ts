import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductListsComponent } from './pages/product-lists/product-lists.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductComponent } from './pages/product-lists/product/product.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'news', component: NewsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'products', component: ProductListsComponent },
    { path: 'products/:id', component: ProductComponent },
    { path: 'stripe-successful-payment', redirectTo: '/checkout', pathMatch: 'full' },
    { path: 'payment-success', component: OrderSummaryComponent },
    { path: '**', component: PageNotFoundComponent }
]
