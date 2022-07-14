import { Component, SyntheticEvent } from "react"
import { Card, Button } from "react-bootstrap"
import { blogInterface, pictureCardInterface } from '../interface/user'
import BlogProvider from "../services/BlogProvider"
import { BlogContext } from '../services/context'
interface BlogEvent {
    target: any
}

export class NewBlog extends Component<{}, blogInterface>{
    constructor(props: any) {
        super(props)
        this.state = { _id: '1231' + Math.random(), name: '', comments: [], content: '', date: new Date().toDateString() }
        NewBlog.contextType = BlogContext
    }
    componentDidMount() {
        console.log('conntext', this.context)
        const blog = this.context
    }
    changeName = (event: BlogEvent) => {
        this.setState({ name: event.target.value })
    }
    changeContent = (event: BlogEvent) => {
        this.setState({ content: event.target.value })
    }
    submitContent = (event: SyntheticEvent, context: any) => {
        event.preventDefault();
        context.addBlog(this.state)
    }

    render() {
        let context = this.context
        return (
            <form onSubmit={(event) => this.submitContent(event, context)}>
                <Card>
                    <Card.Body>
                        <Card.Title><input value={this.state.name} onChange={(e) => { this.changeName(e) }} /></Card.Title>
                        <Card.Subtitle>
                            {this.state.date.toString()}

                        </Card.Subtitle>
                        <Card.Text>
                            <input value={this.state.content} onChange={(e) => this.changeContent(e)} />
                        </Card.Text>
                        <Button type="submit">Submit</Button>
                    </Card.Body>
                </Card>
            </form>
        )
    }
}
export default NewBlog;