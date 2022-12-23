export interface Ad{
  id: number;
  title: string;
  description: string;
  user: User;
  property: Property;
  price: number;
  mq: number;
}

export interface User{
  id: number;
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  age: Number;
  password: string;
  role: string;
  isBanned: Boolean;
}

export interface Property{
  id: number;
  type: string;
  mq: number;
  latitude: string;
  longitude: string;
}

