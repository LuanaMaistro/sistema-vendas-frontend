import axios from "axios"
import * as api from "./api"
import type { BaseAPI } from "./base"

type WhereKeyIsBaseApi<T, U> = {
  [K in keyof T]: T[K] extends new (...args: any[]) => U ? K : never
}[keyof T]

type ApiClients = WhereKeyIsBaseApi<typeof api, BaseAPI>

type InstanceOfClient<K extends ApiClients> = InstanceType<typeof api[K]>

const createApiClients = <T extends ApiClients[]>(...clients: T) => {
  return clients.map(createClient) as {
    [K in keyof T]: InstanceOfClient<T[K] & ApiClients>
  }
}

const getToken = (): string | undefined => {
  try {
    const raw = localStorage.getItem('app-auth')
    if (!raw) return undefined
    return JSON.parse(raw)?.state?.token ?? undefined
  } catch {
    return undefined
  }
}

const createAxiosInstance = () => {
  const token = getToken()
  return axios.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })
}

const createClient = <K extends ApiClients>(client: K): InstanceOfClient<K> => {
  return new api[client](undefined, undefined, createAxiosInstance()) as InstanceOfClient<K>
}


export default createApiClients

