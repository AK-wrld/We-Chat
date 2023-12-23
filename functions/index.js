import { onRequest } from "firebase-functions/v2/https"
import { info } from "firebase-functions/logger"

export const helloWorld = onRequest((request, response) => {
  info("Hello logs!", { structuredData: true })
  response.send("Hello from Firebase!")
})
