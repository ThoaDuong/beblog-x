import { TopicEntity } from './../entities/topic.entity';
import { JwtStrategy } from './../auth/jwt.strategy';
import { PostEntity } from './../entities/post.entity';
import { UserEntity } from './../entities/user.entity';
import { BlogApiService } from './blog-api.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http/http.module';
import { GoogleStrategy } from 'src/auth/auth.strategy';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

export const entities = [
    UserEntity,
    PostEntity,
    TopicEntity
]

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'test',
            entities: entities,
            synchronize: true,
            useUnifiedTopology: true,
          }),
        TypeOrmModule.forFeature(entities),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [BlogController],
    providers: [BlogService, BlogApiService, GoogleStrategy, JwtStrategy],
})
export class BlogModule {}
