export interface AuthStateInterface {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  hasError: boolean;
  error?: string;
  accessToken?: string;
}

export interface UserInterface {
  uid: string;
  email: string;
  photoURL?: string;
  providerId?: string;
  displayName?: string;
  creationTime?: string;
  lastSignInTime?: string;
}

export interface UserStateInterface {
  isUpdating: boolean;
  hasError: boolean;
  error?: string;
  data?: UserInterface;
}

export interface SettingsInterface {
  from: number;
  to: number;
  currency: string;
  roundingValue: number;
}

export interface SettingsStateInteface {
  isUpdating: boolean;
  hasError?: boolean;
  error?: string;
  data?: SettingsInterface;
}

export interface TransactionInterface {
  id: string;
  type: string;
  category: string;
  amount: number;
  date?: number;
  remarks?: string;
}

export interface TransactionsMetaInterface {
  [key: string]: TransactionInterface;
}

export interface TransactionStateInterface {
  isUpdating: boolean;
  isFetching: boolean;
  hasError: boolean;
  error?: string;
  data?: TransactionsMetaInterface;
}

export interface AppStateInterface {
  auth?: AuthStateInterface;
  settings?: SettingsStateInteface;
  transactions?: TransactionStateInterface;
  user?: UserStateInterface;
}