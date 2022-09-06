import { Component, Fragment } from "react";
import { blogInterface, pictureCardInterface } from "../interface/user";
import BlogService from "../services/BlogService";
import Blog from "../Tools/Blog";
import NewBlog from '../Tools/NewBlog'



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
    getBlogav: any
    constructor(props: any) {
        super(props)
    }

    componentDidMount = () => {
        this.getBlogs = this.getBlogs.bind(this)
        this.blogService.getBlogs = this.blogService.getBlogs.bind(this)
        this.getBlogs()
        this.getTheBlogs = this.getTheBlogs.bind(this);
    }

    private getBlogs() {
        this.blogService.getBlogs().then((blogs) => {
            this.setState({ blog: blogs as blogInterface[] })
        })
    }
    private getTheBlogs = (): any[] => {
        if (this.state) {
            const row: any[] = []
            this.props.new ?
                row.push(<NewBlog key={'newBlog'} />) :
                this.state.blog.forEach((iterator) => {
                    row.push(<div key={iterator.name} style={{
                        flex: "1 1 250px",
                    }}>
                        {<Blog key={iterator.name} {...iterator} />}
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