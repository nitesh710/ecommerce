import { Component } from '@angular/core';
import { FeatureComponent } from './feature/feature.component';
import { ProductsComponent } from './products/products.component';
import { DealComponent } from './deal/deal.component';
import { BannerComponent } from './banner/banner.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { NewsComponent } from './news/news.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FeatureComponent,
    ProductsComponent,
    DealComponent,
    BannerComponent,
    AdvertisementComponent,
    NewsComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
