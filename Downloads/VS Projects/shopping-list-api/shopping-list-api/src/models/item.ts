export interface Item {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  createdAt: string; // ISO timestamp
  updatedAt?: string;
}
