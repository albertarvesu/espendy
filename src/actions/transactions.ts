import * as ACTION_TYPES from './../constants/actionTypes';
import { AppActionInterface } from './';
import { TransactionInterface, UserInterface } from './../models';

export interface CreateTransactionInterface {
  (transaction: TransactionInterface, redirect: string, history: any): void;
}

export const createTransaction = (transaction: TransactionInterface, redirect: string, history: any) => ({
  type: ACTION_TYPES.CREATE_TRANSACTION,
  payload: {
    transaction,
    redirect,
    history,
  }
} as AppActionInterface);

export interface GetTransactionsInterface {
  (currentUser: UserInterface): void;
}

export const getTransactions = (currentUser: UserInterface) => ({
  type: ACTION_TYPES.GET_TRANSACTIONS,
  payload: currentUser,
} as AppActionInterface);

export interface DeleteTransactionInterface {
  (transaction: TransactionInterface): void;
}

export const deleteTransaction = (transaction: TransactionInterface) => ({
  type: ACTION_TYPES.DELETE_TRANSACTION,
  payload: transaction
} as AppActionInterface);