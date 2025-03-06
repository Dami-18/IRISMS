export interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
}

const getUserFromDb = (email: string, pwHash: string): User => {
  return {};
};

export { getUserFromDb };
