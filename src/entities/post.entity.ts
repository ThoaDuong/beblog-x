import { PostDTO } from './../blog/dtos/blog.api.dto';
import { Column, CreateDateColumn, Entity, Long, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostEntity{

    @ObjectIdColumn()
    _id: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    description: string;

    @Column()
    img_cover: string;

    @Column()
    user_id: string;

    static from(data: PostDTO): PostEntity{
        return {
            ...new PostEntity(),
            title: data.title,
            content: data.content,
            img_cover: data.img_cover,
            description: data.description,
        }
    }
}

