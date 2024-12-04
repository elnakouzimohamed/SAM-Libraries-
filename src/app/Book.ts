import { Author } from "./Author";
import { Category } from "./Category";

export interface Book{
    bookId: string;
    title: string;
    type: string;
    categories: Category[];
    authors: Author[];
    purchasePrice: number;
    borrowPrice: number;
    publisher: string;
    imageUrl: string;
    voiceSummaryUrl: string; 
    qty: number;

}

export interface BookCopy{
    bookCopyID: number;
    title: string;
    type: string;
    category: string[];
    author: string[];
    purchasePrice: number;
    publisher: string;
    status: string;
    imageURL: string;
    voiceSummaryURL: string; 

}