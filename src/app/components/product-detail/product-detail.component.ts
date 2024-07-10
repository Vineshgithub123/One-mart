// FrameWork Imports
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
//Third Party
import { ImageModule } from 'primeng/image';
// User Defined Imports
import { ProductService } from 'src/app/services/product.service';
import { SelectedCategoryProductDetail } from 'src/app/utils/interfaces/products.data';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ImageModule,
    MatDialogClose,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  productDetail!: SelectedCategoryProductDetail;
  response: boolean = false;

  constructor(
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    this.response = false;
    this.productService
      .getProductDetail(this.data)
      .subscribe((res: SelectedCategoryProductDetail) => {
        this.response = true;
        this.productDetail = res;
      });
  }
  /**
   * updates cart count
   */
  addToCart(): void {
    this.productService.updateCart();
  }
}
