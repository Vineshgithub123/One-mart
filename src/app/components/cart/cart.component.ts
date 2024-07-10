// FrameWork Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// User Defined Imports
import { ProductService } from '@/srcapp/services/product.service';
import { SelectedCategoryProductDetail } from '@/srcapp/utils/interfaces/products.data';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  productInCart: SelectedCategoryProductDetail[] = [];
  filteredProductInCart: SelectedCategoryProductDetail[] =[];

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.dataObservable$.subscribe((res: SelectedCategoryProductDetail[]) => {
      this.productInCart = res;
      this.filteredProductInCart = this.productInCart;
    })
    this.productService.searchTerm$.subscribe((res: string)=> {
      this.filterData(res)
    })
  }

  /**
   * 
   * @param index remove the item from the cart based on the index
   */
  remove(index: number): void {
    this.productInCart?.splice(index);
    this.productService.removeFromCart()
  }

  /**
   * 
   * @param term Filter data based on the user search
   */
  filterData(term: string): void {
    this.filteredProductInCart = this.productInCart.filter((value: SelectedCategoryProductDetail) => value.title.toLowerCase().includes(term.toLowerCase()))
  }
}
