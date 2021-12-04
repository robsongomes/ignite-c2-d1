import { v4 as uuidV4 } from "uuid";

class User {
  id: string;
  name: string;
  email: string;
  admin: boolean = false;
  created_at?: Date;
  updated_at?: Date;

  constructor() {
    this.id = uuidV4();
  }
}

export { User };
