import {datatype, image, name, random} from 'faker';
import {Guitar} from '../types/guitar';

export const makeFakeComment = () => ({
  id: datatype.number(50).toString(),
  userName: name.title(),
  advantage: datatype.string(10),
  disadvantage: datatype.string(10),
  comment: datatype.string(10),
  rating: datatype.number(5),
  createAt: datatype.string(10),
  guitarId: datatype.number(5),
});

export const makeFakeCommentsList = (value: number) => new Array(value).fill(null).map(() => makeFakeComment());


export const makeFakeGuitar = () => ({
  comments: makeFakeCommentsList(4),
  id: datatype.number(500),
  name: name.title(),
  vendorCode: name.title(),
  type: random.word(),
  description: datatype.string(10),
  previewImg: image.image(),
  stringCount: datatype.number(12),
  rating: datatype.number(5),
  price: datatype.number(100),
});

export const makeFakeGuitarsList = (value: number): Guitar[] => new Array(value).fill(null).map(() => makeFakeGuitar());

export const fakeGuitar = {
  id: 1,
  name: 'name',
  vendorCode: 'code',
  type: 'type',
  description: 'description',
  previewImg: 'image',
  stringCount: 2,
  rating: 3,
  price: 4,
};

export const fakeComment = {
  id: '1',
  userName: 'name',
  advantage: 'advantage',
  disadvantage: 'disadvantage',
  comment: 'comment',
  rating: 2,
  createAt: 'date',
  guitarId: 3,
};

export const makeFakeCartItem = () => ({
  guitar: makeFakeGuitar(),
  count: 2,
});

export const makeFakeCartItems = (value: number) => new Array(value).fill(null).map(() => makeFakeCartItem());
