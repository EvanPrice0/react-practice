import { Component } from "react"
import { blogInterface, Comment } from "../interface/user";
import axios from 'axios';

interface BlogServiceProps {
    userName: string
    password: string
    loggedIn: boolean
    stateOf?: () => void
}
interface BlogServiceState {
    blogs: blogInterface[]
}


const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/JSON',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};
export class BlogService extends Component<BlogServiceProps, BlogServiceState>{
    initBlog: blogInterface[] = []
    constructor(props: any) {
        super(props)
        this.state = { blogs: [] }
        this.addBlog = this.addBlog.bind(this)
        this.addBlogComment.bind(this)
    }

    public addBlog = async (blog: blogInterface): Promise<blogInterface[] | undefined> => {
        const resp = await axios.post<blogInterface>('http://localhost:8000/api/blog', { blog }, { headers: headers }
        );
        if (resp.status === 200) {
            let getBlogs = this.state.blogs
            let new_blogs = getBlogs.concat(resp.data)
            this.setState({ blogs: new_blogs })
            return new_blogs
        }
        else return undefined
    }

    public addBlogComment = async (blog: blogInterface, comment: Comment): Promise<blogInterface[] | undefined> => {
        console.log(blog, comment)
        const resp = await axios.put<blogInterface[]>('http://localhost:8000/api/comment', { blog: blog, comment: comment }, { headers: headers }
        );
        if (resp.status === 200) {
            return resp.data
        }
        else return undefined
    }

    public getBlogs = async (): Promise<blogInterface[] | undefined> => {
        const resp = await axios.get<blogInterface[]>('http://localhost:8000/api/blogs', { headers: headers })
        if (resp.status === 200) {
            return resp.data
        }
        else return undefined
    }
}
export default BlogService;