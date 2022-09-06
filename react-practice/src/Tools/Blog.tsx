import { Component, SyntheticEvent } from "react"
import { Card, Button, Form } from "react-bootstrap"
import { blogInterface, Comment, pictureCardInterface } from '../interface/user'
import { AuthService } from "../services/AuthService"
import BlogService from "../services/BlogService"
import linnet from '../assets/linnet.jpg'

interface propsBlogInterface {
    blog: blogInterface
    auth: AuthService
}
interface stateBlogInterface {
    edit: boolean,
    addComment: boolean,
    commen: Comment
    more: boolean
    blog: blogInterface
}
export class Blog extends Component<blogInterface, stateBlogInterface>{
    blogService: BlogService = new BlogService('')
    constructor(props: any) {
        super(props)
        this.state = {
            addComment: false,
            more: false,
            edit: false,
            commen: {
                _id: '0',
                date: Date.now.toString(),
                user_id: '1',
                username: '',
                blog_id: '2',
                comment: '',
                title: '',
                responses: []
            },
            blog: this.props

        }
    }
    submit = async (event: SyntheticEvent) => {
        {
            event.preventDefault()
            this.blogService.addBlogComment(this.props, this.state.commen);
            this.setState({ addComment: false });
            let retVal: blogInterface | undefined;
            let blogs = await this.blogService.getBlogs();
            if (blogs && (retVal = blogs.find(x => x._id == this.props._id)) != undefined) {
                console.log(retVal)
                this.setState({ blog: retVal })
            }
            event.persist()
        }
    }
    addComment = () => {
        let rows: any[] = []
        const returnVal = this.state.addComment ?
            <Form onSubmit={async (event) => this.submit(event)} style={{ display: 'flex', flexDirection: 'column' }}>
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
                <input type="submit" key={this.state.commen._id + 'button'} />
            </Form> :
            <></>
        return (
            returnVal
        )
    }
    card = (comment: Comment) => {
        return (<div key={comment._id + '__comments' + Math.random().toString()}>
            <div style={{ display: 'flex', flexWrap: "nowrap" }}>
                <Card.Img src={linnet} style={{ width: '50px', height: '50px' }} />
                <div style={{ height: '50px', paddingLeft: '3%' }}>
                    <Card.Title>{comment.username}</Card.Title>
                    <Card.Text>{comment.title}</Card.Text>
                </div>
            </div>
            <Card.Text style={{ padding: "10px" }}>{comment.comment}</Card.Text>
            <hr />
        </div>)
    }

    mapComments = () => {
        let rows: any[] = [<div key={'commentsheader'}><div>Comments</div><hr /></div>]
        this.state.more ?
            this.state.blog.comments.forEach((comment) => {
                rows.push(this.card(comment))
            }) : this.state.blog.comments[0] != undefined ? rows.push(this.card(this.state.blog.comments[0])) : <></>
        rows.push(<Button key={this.props._id + 'button'} onClick={() => { this.setState({ more: !this.state.more }) }} >Comment</Button >)

        return rows
    }
    render() {
        return (
            <Card key={this.props._id + 'cardabc'}>
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    {/* <Card.Subtitle>
                        {this.props.date.toString() ?? Date.now.toString()}

                    </Card.Subtitle> */}
                    <Card.Text>
                        {this.props.content}
                    </Card.Text>
                    <Card.Body style={{ width: "400px" }}>
                        {this.mapComments()}
                    </Card.Body>
                    {this.addComment()}
                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => { this.setState({ addComment: !this.state.addComment }) }}>Comment</Button>
                    {/* <Button style={{ float: "right" }} onClick={() => { this.setState({ edit: !this.state.edit }) }}>Edit(Linnet ONLY)</Button> */}
                </Card.Footer>
            </Card >
        )
    }
}
export default Blog;