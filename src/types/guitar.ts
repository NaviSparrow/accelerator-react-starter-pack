import {CommentList} from './comment';

type Id = number;
type Name = string;
type VendorCode = string;
type Type = string;
type Description = string;
type PreviewImg = string;
type StringCount = number;
type Rating = number;
type Price = number;

export type Guitar = {
  comments: CommentList;
  id: Id;
  name: Name;
  vendorCode: VendorCode;
  type: Type;
  description: Description;
  previewImg: PreviewImg;
  stringCount: StringCount;
  rating: Rating;
  price: Price;
};

export type GuitarsList = Guitar[];
