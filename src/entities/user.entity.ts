import { UserDTO } from './../blog/dtos/blog.api.dto';
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class UserEntity{

    @ObjectIdColumn()
    _id: string;

    @Column()
    email: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    avt_url: string;

    @Column()
    access_token: string;

    @Column({nullable: true})
    description: string;

    @CreateDateColumn()
    created_at: Date;


    static from(data: UserDTO): UserEntity{
        return {
            ...new UserEntity(),
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            avt_url: data.avt_url,
            access_token: data.access_token,
        }
    }
}

