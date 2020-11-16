import { TopicDTO } from './../blog/dtos/blog.api.dto';
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class TopicEntity{

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @CreateDateColumn({ type: 'date' })
    created_at: Date

    @CreateDateColumn({ type: 'date' })
    updated_at: Date

    static from(data: TopicDTO): TopicEntity{
        return {
            ...new TopicEntity(),
            name: data.name,
        }
    }
}

