import { Component, Fragment } from "react";
import { Card, Button } from "react-bootstrap";
import { blogInterface, pictureCardInterface } from "../interface/user";
import BlogService from "../services/BlogService";
import { BlogContext, useBlogContext } from "../services/context";
import Blog from "../Tools/Blog";
import NewBlog from '../Tools/NewBlog'
import PersonCard from "../Tools/PersonCard";
import PictureCard from "../Tools/PictureCard";


function getName(size: number) {
    let retList = []
    for (let x = 0; x < size; x++) {
        let y: pictureCardInterface = {
            _id: `${x}`, name: `${x}`, description: `aaaa`
        }
        retList.push(y)
    }
    return retList;
}

const cards = getName(12)
// const blogs: blogInterface[] = [{ _id: '0', name: 'a', content: 'anb', date: new Date(), comments: [] }
//     , { _id: '1', name: 'bb', content: 'ansdafb', date: new Date(), comments: [] }]

export class BlogHomeClass extends Component<{ new: boolean }, { blog: blogInterface[] }> {
    private blogService: BlogService = new BlogService('')
    constructor(props: any) {
        super(props)
        this.state = { blog: [] }
    }

    async componentDidMount() {
        this.getBlog = this.getBlog.bind(this)

        await this.getBlog()
    }
    private getBlog = async () => {
        let blogs = await this.blogService.getBlogs()
        this.setState({ blog: blogs as blogInterface[] })
    }

    private getTheBlogs = (): any[] => {
        if (this.state) {
            const row: any[] = []
            this.state.blog.forEach((iterator) => {
                row.push(<div key={iterator.name} style={{
                    flex: "1 1 250px",
                }}>
                    {this.props.new ? <NewBlog /> : <Blog key={iterator.name} {...iterator} />}
                </div>)
            })
            return row;
        }
        return [];
    }
    render() {
        return (
            <Fragment>
                <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
                    {this.getTheBlogs()}
                </div>
            </Fragment>

        )
    }
}
export default BlogHomeClass;