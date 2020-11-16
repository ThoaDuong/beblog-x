import { UserEntity } from './../entities/user.entity';
import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class BlogApiService {

    constructor(
        private http: HttpService
    ){}

    createHeaders(token){
        return {
            Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
        }
    }
    createHttpOptions(token){
        return {
            headers: this.createHeaders(token)
        }
    }

    // async getTableUser(table_name: string): Promise<any>{
    //     const url = `${process.env.AIR_URL}/${process.env.AIR_BASE_CODE}/${table_name}`;
    //     return await this.http.get(url, this.createHttpOptions(process.env.AIR_API_KEY))
    //         .toPromise()
    //             .then(res => res.data)
    //             .catch(error => console.log('Error in getTableUser()'));
    // }

    // async createTableUser(data, table_name: string): Promise<any>{
    //     const url = `${process.env.AIR_URL}/${process.env.AIR_BASE_CODE}/${table_name}`;
    //     return await this.http.post(url, data, this.createHttpOptions(process.env.AIR_API_KEY))
    //         .toPromise().then(res => res.data);
    // }
}
