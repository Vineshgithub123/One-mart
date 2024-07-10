export interface Rating {
  rate: number;
  count: number;
}

export interface SelectedCategoryProductDetail {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}
