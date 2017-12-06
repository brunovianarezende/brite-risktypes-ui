import axios from 'axios'

let apiSingleton = null

export const setApi = (api) => {
  apiSingleton = api
}

export const getApi = () => {
  return apiSingleton
}

/* eslint-disable no-unused-vars */
class TempApi {
/* eslint-disable no-unused-vars */
}

class RealApi {
}

export const buildApi = () => {
  const instance = axios.create({
    baseURL: '/api'
  })
  return new RealApi(instance)
}
