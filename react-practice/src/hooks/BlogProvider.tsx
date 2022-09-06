import { createContext, useContext, useState, useEffect } from "react"
import { blogInterface } from "../interface/user";
import axios from 'axios';
import { BlogContext } from "./context";



const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/JSON',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};
const BlogProvider = (props: any) => {
    let initBlog: blogInterface[] = []
    const [getBlogs, setBlogs] = useState(initBlog)

    const addBlog = async (blog: blogInterface) => {
        const resp = await axios.post('http://localhost:8000/api/blog', { blog }, { headers: headers }
        );
        if (resp.status === 200) {
            let new_blogs = getBlogs.concat(blog)
            setBlogs(new_blogs)
        }
    }

    useEffect(() => {
        const getter = async () => {
            axios.get<blogInterface[]>('http://localhost:8000/api/blogs', { headers: headers }).then((x) => {
                console.log(x.data)
                setBlogs(x.data)
            })
        }
        getter().catch(console.error)
        console.log(getBlogs)
    }, [])
    const blogContext = {
        getBlogs,
        addBlog
    }
    return (<BlogContext.Provider value={blogContext}>
        {props.children}
    </BlogContext.Provider>)
}
export default BlogProvider;