import { PostDTO, TopicDTO } from './dtos/blog.api.dto';
import { BlogService } from './blog.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class BlogController {
    constructor(
        private blogService: BlogService,
    ){}

    //USER
    //Login with google
    @Get('login')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        console.log('get login',req.user);
    }
  
    //Google redirect this url with user's data
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        const result = await this.blogService.googleLogin(req);
        res.redirect(`http://localhost:4200/home?email=${result.email}&token=${result.access_token}`);
    }

    //Get list users
    @Get('user/gets')
    // @UseGuards(AuthGuard('jwt'))
    async getUsers(){
        return await this.blogService.getUsers();
    }

    //POST
    //Get all posts
    @Get('post/gets')
    // @UseGuards(AuthGuard('jwt'))
    async getPosts(){
        return await this.blogService.getPosts();
    }
    //Get all posts filter by user
    @Get('post/user/gets')
    @UseGuards(AuthGuard('jwt'))
    async getPostsByUser(@Req() req){
        return await this.blogService.getPostsByUser(req.user.user_id);
    }
    //Get post by id
    @Get('post/get/:id')
    @UseGuards(AuthGuard('jwt'))
    async getPost(@Param('id') id: string){
        return await this.blogService.getPostById(id);
    }
    //Create a new post
    @Post('post/create')
    @UseGuards(AuthGuard('jwt'))
    async createPost(@Body() data: PostDTO, @Req() req){
        return await this.blogService.createPost(data, req.user.user_id);
    }
    //Update post
    @Put('post/edit/:id')
    @UseGuards(AuthGuard('jwt'))
    async updatePost(@Body() data: PostDTO, @Param('id') id: string){
        return await this.blogService.updatePost(id, data)
    }
    //Delete post
    @Delete('post/delete/:id')
    @UseGuards(AuthGuard('jwt'))
    async deletePost(@Param('id') id: string){
        return await this.blogService.deletePost(id);
    }

    //TOPIC
    //Get all topics
    @Get('topic/gets')
    async getTopics(){
        return await this.blogService.getTopics();
    }
    //Create topic
    @Post('topic/create')
    async createTopic(@Body() data: TopicDTO){
        return await this.blogService.createTopic(data);
    }
    //Update topic
    @Put('topic/edit/:id')
    async updateTopic(@Param('id') id: string, @Body() topic_name: string){
        return await this.blogService.updateTopic(id, topic_name);
    }
    //Delete topic
    @Delete('topic/delete/:id')
    async deleteTopic(@Param('id') id: string){
        return await this.blogService.deleteTopic(id);
    }

}
