type Id = string;
type UserName = string;
type Advantages = string;
type Disadvantages = string;
type CommentText = string;
type Rating = number;
type CreateAt = string;
type GuitarId = number;

export type Comment = {
  id: Id;
  userName: UserName;
  advantages: Advantages;
  disadvantages: Disadvantages;
  comment: CommentText;
  rating: Rating;
  createAt: CreateAt;
  guitarId: GuitarId;
};

export type CommentList = Comment[];
