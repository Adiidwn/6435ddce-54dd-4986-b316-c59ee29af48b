import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async post(url: string, data: any) {
    const response = await axios.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      const responseData = response.data;
      return responseData;
    } else {
      console.error('Failed to fetch:', response.statusText);
    }
  }
  catch(error) {
    console.error('An error occurred:', error);
  }

  async get(url: string): Promise<any> {
    try {
      const response = await axios.get(url);

      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        return responseData;
      } else {
        console.error('Failed to fetch:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
