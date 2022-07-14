import { Component } from "react"
import { Card, Button } from "react-bootstrap"
import { blogInterface, Comment, pictureCardInterface } from '../interface/user'
import BlogProvider from "../services/BlogProvider"
import BlogService from "../services/BlogService"
interface setBlogInterface {
    _id: string
    blog: blogInterface
}
interface stateBlogInterface {
    edit: boolean,
    addComment: boolean,
    commen: Comment
}
export class Blog extends Component<blogInterface, stateBlogInterface>{
    blogService: BlogService = new BlogService('')
    constructor(props: any) {
        super(props)
        this.state = {
            addComment: false,
            edit: false, commen: {
                _id: '0',
                date: Date.now.toString(),
                user_id: '1',
                username: 'billybob',
                blog_id: '2',
                comment: '',
                title: '',
                responses: []
            }
        }
    }

    addComment = () => {
        let rows: any[] = []
        const returnVal = this.state.addComment ?
            <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                <h4>Title</h4>
                <input type="text" style={{ width: '500px' }} title="title" onChange={((event) => {
                    const newState: Comment = { ...this.state.commen, title: event.target.value }
                    this.setState({ commen: newState })
                })} />
                <h4>Comment</h4>
                <textarea style={{ height: '300px', width: '500px', textAlign: 'start' }} onChange={((event) => {
                    const newerState: Comment = { ...this.state.commen, comment: event.target.value }
                    this.setState({ commen: newerState })
                })} />
                <Button onClick={() => this.blogService.addBlogComment(this.props, this.state.commen)} />
            </Card.Body> :
            <></>
        return (
            returnVal
        )
    }


    mapComments = () => {
        let rows: any[] = []
        this.props.comments.forEach((comment) => {
            rows.push(<div>
                <h1>{comment.comment}</h1>
                <h1>{comment.user_id}</h1>
            </div>)
        })
        return rows
    }
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    {/* <Card.Subtitle>
                        {this.props.date.toString() ?? Date.now.toString()}

                    </Card.Subtitle> */}
                    <Card.Text>
                        {this.props.content}
                    </Card.Text>
                    <Card.Text>
                        {this.mapComments()}
                    </Card.Text>
                    {this.addComment()}
                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => { this.setState({ addComment: !this.state.addComment }) }}>Comment</Button>
                    <Button style={{ float: "right" }} onClick={() => { this.setState({ edit: !this.state.edit }) }}>Edit(Linnet ONLY)</Button>
                </Card.Footer>
            </Card >
        )
    }
}
export default Blog;