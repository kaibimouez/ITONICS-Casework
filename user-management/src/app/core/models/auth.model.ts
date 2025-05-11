import { User } from "./user.model";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
