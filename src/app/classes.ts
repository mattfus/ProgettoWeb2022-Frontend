export interface Ad{
  id: number;
  title: string;
  description: string;
  user: User;
  property: Property;
  price: number;
  mq: number;
}

export class User{
  id!: number;
  name!: string;
  lastname!: string;
  age!: number;
  nickname!: string;
  password!: string;
  email!: string;
  role!: string;
  isBanned!: boolean;
}

export interface Property{
  id: number;
  type: string;
  mq: number;
  latitude: string;
  longitude: string;
  user : string;
}

