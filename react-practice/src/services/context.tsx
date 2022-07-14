import { createContext, useContext } from "react";
import { blogInterface } from "../interface/user";
export const BlogContext = createContext({ getBlogs: ([] as blogInterface[]), addBlog: async (blog: blogInterface) => { return } });
export const useBlogContext = () => useContext(BlogContext);