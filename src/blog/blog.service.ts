import { ObjectID } from 'typeorm';
import { TopicEntity } from './../entities/topic.entity';
import { PostEntity } from './../entities/post.entity';
import { UserDTO, PostDTO, TopicDTO } from './dtos/blog.api.dto';
import { BlogApiService } from './blog-api.service';
import { UserEntity } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class BlogService {

    constructor(
        // private apiService: BlogApiService,
        private jwtService: JwtService,

        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
        @InjectRepository(TopicEntity) private topicRepo: Repository<TopicEntity>,
    ) { }


    //USER
    async createOrUpdateUser(userDto: UserDTO) {
        let result;
        const existUser = await this.userRepo.findOne({
            where: { email: userDto.email }
        })
        if (existUser) {
            result = {
                _id: existUser._id,
                ...userDto,
            }
        }
        else {
            result = UserEntity.from(userDto);
        }
        return await this.userRepo.save(result);
    }
    async googleLogin(req) {
        if (!req.user) {
            return;
        }
        const userDB = await this.createOrUpdateUser(req.user);
        const payload = { email: req.user.email, user_id: userDB._id, token: req.user.access_token };
        return {
            access_token: this.jwtService.sign(payload),
            email: userDB.email,
        };
    }
    async getUsers(): Promise<UserEntity[]>{
        return await this.userRepo.find();
    }

    //POST
    async getPosts(): Promise<PostEntity[]>{
        return await this.postRepo.find();
    }
    async getPostsByUser(user_id: string): Promise<PostEntity[]>{
        return await this.postRepo.find({
            where: { user_id: user_id }
        });
    }
    async getPostById(id: string): Promise<PostEntity>{
        return await this.postRepo.findOne({
            where: { _id: id }
        });
    }
    async createPost(data: PostDTO, user_id: string): Promise<PostEntity>{
        const postDto = {
            ...PostEntity.from(data),
            user_id: user_id,
        }
        return await this.postRepo.save(postDto);
    }
    async updatePost(update_id: string, data: PostDTO): Promise<any>{
        const update_data = {
            title: data.title,
            content: data.content,
            img_cover: data.img_cover,
            description: data.description,
        }
        return await this.postRepo.update(
            update_id , update_data
        );
    }
    async deletePost(id:string){
        return await this.postRepo.delete(id);
    }

    //TOPIC
    async getTopics(): Promise<TopicEntity[]>{
        return await this.topicRepo.find();
    }

    async createTopic(data: TopicDTO): Promise<TopicEntity>{
        const topicDto = {
            ...TopicEntity.from(data),
        }
        return await this.topicRepo.save(topicDto)
    }

    async updateTopic(topic_id: string, topic_name: string): Promise<UpdateResult>{
        return await this.topicRepo.update(
            { id: topic_id },
            {
                name: topic_name,
                updated_at: Date.now(),
            }
        )
    }
    async deleteTopic(topic_id: string){
        return await this.topicRepo.delete({ id: topic_id });
    }
}
