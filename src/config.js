import {config} from 'dotenv'
import {resolve} from 'node:path'
export const NODE_ENV = process.env.NODE_ENV ?? development
config({path: resolve(`.env.${NODE_ENV}`)})

export const PORT = parseInt( process.env.PORT ?? "900");
export const DB_URI=process.env.DB_URI
export const ENC_KEY=process.env.ENC_KEY
export const IV_LENGTH=parseInt(process.env.IV_LENGTH ?? "16")
