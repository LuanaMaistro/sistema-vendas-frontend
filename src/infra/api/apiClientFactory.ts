import * as api from "./api"
import type { BaseAPI } from "./base"

type WhereKeyIsBaseApi<T, U> = {
  [K in keyof T]: T[K] extends new (...args: any[]) => U ? K : never
}[keyof T]

type apiClients = WhereKeyIsBaseApi<typeof api, BaseAPI>

type InstanceOfClient<K extends apiClients> = InstanceType<typeof api[K]>

const createApiClients = <T extends apiClients[]>(...clients: T) => {
  return clients.map(createClient) as {
    [K in keyof T]: InstanceOfClient<T[K] & apiClients>
  }
}

const createClient = <K extends apiClients>(client: K): InstanceOfClient<K> => {
  return new api[client](undefined, 'teste') as InstanceOfClient<K>
}


export default createApiClients

