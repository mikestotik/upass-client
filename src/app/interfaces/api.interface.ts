import { HttpStatusCode } from 'axios';

export interface ApiError {
  message: string;
  error: string;
  statusCode: HttpStatusCode;
}
