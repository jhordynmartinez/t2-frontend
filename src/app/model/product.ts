import { Category } from "./category";
import { Family } from "./family";
import { Laboratory } from "./laboratory";

export interface Product {
    idProduct: number;
    name: string;
    description: string;
    presentation: string;
    unitPrice: number;
    stock: number;
    expired: string; // Se maneja como string para el datepicker
    category: Category;
    family: Family;
    laboratory: Laboratory;
}