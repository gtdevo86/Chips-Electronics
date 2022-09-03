export const CHANGE_IN_URL = 'CHANGE_IN_URL'

const prod = {
  API_URL: 'https://api-dot-chips-electronics.uc.r.appspot.com',
}

const dev = {
  API_URL: 'http://localhost:5000',
  //API_URL: 'https://api-dot-chips-electronics.uc.r.appspot.com',
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod
