import {Data} from "./data.ts";

export interface ContosoResponse<T> {
  status: string
  timestamp: string
  data: Data<T>
}

