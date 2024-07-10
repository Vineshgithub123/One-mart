// FrameWork Imports
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
//Material Imports
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
// User Defined Imports
import { ProductService } from 'src/app/services/product.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, NavbarComponent],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  currentUrlId: string = '';

  constructor(private productService: ProductService, private route: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe((res: string[]) => {
      this.categories = res;
    });
    this.route.events.subscribe(() => {
        this.currentUrlId = this.activeRoute.snapshot.queryParams['type'];
    });
  }

  /**
   * 
   * @param type Helps to switch between the different categories
   */
  getCategorizedProduct(type: string): void {
    this.route.navigate([`products/${type}`], {queryParams: {type}});
  }
}
