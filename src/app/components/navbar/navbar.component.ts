// FrameWork Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// User Defined Imports
import { IMAGE_NAME } from 'src/app/utils/enums/image-name.enum';
import { ProductService } from '@/srcapp/services/product.service';
import { IMAGE_PATH } from 'src/app/utils/enums/image-path.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  imageName: typeof IMAGE_NAME = IMAGE_NAME;
  imagePath: typeof IMAGE_PATH = IMAGE_PATH;
  cartCount: number = 0;
  currentUrlId: string = '';
  currentUrl: string = "";

  constructor(
    private productService: ProductService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.currentCount$.subscribe((res: number) => {
      this.cartCount = res;
    });
    this.route.events.subscribe((res) => {
      this.currentUrl = res.toString();
      if(this.currentUrl.includes('profile') || this.currentUrl.includes('cart')) {
        this.currentUrlId = this.currentUrl.includes('profile') ? 'profile' : 'cart';
      } else {
        this.currentUrlId = this.activeRoute.snapshot.queryParams['type'];
      }
    });
  }

  moveToCart(): void {
    this.route.navigate(['/cart']);
  }

  /**
   * 
   * @param event Search function to search the items based on the user inputs
   */
  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.productService.setSearchItem(target.value);
    }
  }

  moveToProfile(): void {
    this.route.navigate(['/profile']);
  }
}
