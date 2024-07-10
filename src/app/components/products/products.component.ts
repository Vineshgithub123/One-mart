// FrameWork Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//Material Imports
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
// User defined imports
import { ProductService } from 'src/app/services/product.service';
import { SelectedCategoryProductDetail } from 'src/app/utils/interfaces/products.data';
import { ProductDetailComponent } from 'src/app/components/product-detail/product-detail.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  categoryProduct!: SelectedCategoryProductDetail[];
  filteredCategoryProduct!: SelectedCategoryProductDetail[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => {
      if (this.router.url.includes('products')) {
        this.getProductCategory();
      }
    });
    this.productService.searchTerm$.subscribe((res: string)=> {
      this.filterData(res)
    })
  }

  /**
   * Gets the products of selected category which is from the API
   */
  getProductCategory(): void {
    this.productService
      .getProductBySelectedCategory(this.activeRoute.snapshot.params['id'])
      .subscribe((res: SelectedCategoryProductDetail[]) => {
        this.categoryProduct = res;
        this.filteredCategoryProduct = this.categoryProduct;
      });
  }

  /**
   * 
   * @param id selected item id
   * @param list selected item properties
   * opens up the modal to view the details of the category
   */
  viewDetails(id: number, list: SelectedCategoryProductDetail): void {
    const dialog = this.dialog.open(ProductDetailComponent, { data: id });
    this.productService.addCart(list);
  }
  
  /**
   * 
   * @param term user input term
   * filter data based on the user inputs
   */
  filterData(term: string): void {
    this.filteredCategoryProduct = this.categoryProduct.filter((value: SelectedCategoryProductDetail) => value.title.toLowerCase().includes(term.toLowerCase()))
  }
}
