import { fold, OperationError, type Either, type OperationResult } from "@dibimo/core-lib";
import type { Notification } from "../hooks/notification/notification";

export const eitherToBoolean = <L, R>(aEither: Either<L, R>) =>
  fold(aEither, () => false, () => true)

export const operationResultToNotification = <T>(result: OperationResult<T>): Notification => {
  return fold(result, errorToNotification, successToNotification)
}

const successToNotification = <T>(_: T): Notification => {
  return {
    title: 'Sucesso',
    description: 'Operação realizada com sucesso!',
    type: 'success'
  }
}


const errorToNotification = (err: OperationError | Error): Notification => {
  if(err instanceof OperationError) {
    return {
      title: `Error ao realizar operação (${err.code})`,
      description: err.message,
      type: 'error'
    }
  }

  return {
    title: 'Erro inesperado',
    description: 'Ocorreu um erro inesperado ao realizar a operação',
    type: 'error'
  }

}

