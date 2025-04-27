export default interface Product {
  id: string;
  name: string;
  qty: number;
  price: number;
  photo: string;
  categories: { id: string; name: string }[];
}
