import type1 from './assets/insuranceExamples/stolen_car.json'
import type2 from './assets/insuranceExamples/property.json'
import {FullType} from './model'

import axios from 'axios'

let apiSingleton = null

export const setApi = (api) => {
  apiSingleton = api
}

export const getApi = () => {
  return apiSingleton
}

const _clone = (o) => JSON.parse(JSON.stringify(o))

class TempApi {
  constructor () {
    this.types = [
      type1, type2
    ]
    this.nextId = 0
  }

  addInsurance (insurance) {
    this.nextId++
    return Promise.resolve(this.nextId)
  }

  searchTypes () {
    return Promise.resolve(this.types.map((t) => new FullType(_clone(t))))
  }

  getType (id) {
    const filtered = this.types.filter((t) => id === t.id)
    if (filtered.length > 0) {
      return Promise.resolve(new FullType(_clone(filtered[0])))
    } else {
      return Promise.reject(new Error(`Type '${id}' not found`))
    }
  }
}

class RealApi {
  constructor (axiosInstance) {
    this.axiosInstance = axiosInstance
    this.nextId = 0
  }

  addInsurance (insurance) {
    this.nextId++
    return Promise.resolve(this.nextId)
  }

  searchTypes () {
    return this.axiosInstance
      .get('/search/types/')
      .then((result) => {
        return result.data.types.map((t) => new FullType(t))
      })
  }

  getType (id) {
    return this.axiosInstance
      .get(`/types/${id}/`)
      .then((result) => {
        return new FullType(result.data)
      })
  }
}

export const buildApi = (useTempApi = false) => {
  if (useTempApi) {
    return new TempApi()
  } else {
    const instance = axios.create({
      baseURL: '/api'
    })
    return new RealApi(instance)
  }
}
