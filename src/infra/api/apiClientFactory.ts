import * as api from "./api"
import type { BaseAPI } from "./base"

type WhereKeyIsBaseApi<T, U> = {
  [K in keyof T]: T[K] extends new (...args: any[]) => U ? K : never
}[keyof T]

type apiClients = WhereKeyIsBaseApi<typeof api, BaseAPI>

const clientFactory = (...clients: apiClients[]) => {
  return clients.map(createClient)
}

const createClient = (client: apiClients) => {
  return new api[client](undefined, 'teste')
}


export default clientFactory

