// FrameWork Imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Rxjs Imports
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
// User Defined Imports
import { SelectedCategoryProductDetail } from 'src/app/utils/interfaces/products.data';

@Injectable({ providedIn: 'root' })
export class ProductService {

  cartCount = new BehaviorSubject<number>(0);
  currentCount$ = this.cartCount.asObservable();
  cartData = new BehaviorSubject<SelectedCategoryProductDetail []>([]);
  dataObservable$ = this.cartData.asObservable() as Observable<SelectedCategoryProductDetail[]>;
  searchSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * 
   * @returns the response of the GET API of getting the categories
   */
  getAllCategories(): Observable<string[]> {
    return this.http.get("https://fakestoreapi.com/products/categories") as Observable<string[]>;
  }

  /**
   * 
   * @param id Recieves product Id
   * @returns the response of the GET API of getting the products by id
   */
  getProductDetail(id: string | number): Observable<SelectedCategoryProductDetail> {
    return this.http.get(`https://fakestoreapi.com/products/${id}`) as Observable<SelectedCategoryProductDetail>;
  }

  /**
   * 
   * @param category parameter for getting the category by its name as params
   * @returns the response of the GET API of getting the products by category
   */
  getProductBySelectedCategory(category :string): Observable<SelectedCategoryProductDetail[]> {
    return this.http.get(`https://fakestoreapi.com/products/category/${category}`) as Observable<SelectedCategoryProductDetail[]>
  }

  /**
   * update cart
   */
  updateCart(): void {
    this.cartCount.next(this.cartCount.getValue() + 1);
  }

  /**
   * remove item from the cart
   */
  removeFromCart(): void {
    this.cartCount.next(this.cartCount.getValue() - 1);
  }

  /**
   * 
   * @param list update the list in th cart
   */
  addCart(list: SelectedCategoryProductDetail): void {
  const updatedCartData = [...this.cartData.getValue()];
  updatedCartData.push(list);
  this.cartData.next(updatedCartData);
  }

  setSearchItem(term: string): void {
    this.searchSubject.next(term);
  }
}
