import axios from 'axios'
import { baseUrl, key } from './constants'

export function getLocation(latitude: number, longitude: number) {
  return axios.get(`${baseUrl}/radius`, {
    params: {
      apikey: key,
      radius: 15000,
      lon: longitude,
      lat: latitude,
      kinds: 'tourist_object',
      limit: 20,
    },
  })
}

export const getMapUrl = (query: string) =>
  `https://www.google.com/maps/search//?api=1&query=${encodeURIComponent(query)}`
