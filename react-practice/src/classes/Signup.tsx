import { Component, SyntheticEvent } from "react";
import { User } from "../interface/user";
import { AuthService } from "../services/AuthService";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Card } from "react-bootstrap";

interface SignupProps {
    loggedIn?: boolean
    login: (x: User) => void
}

interface SignupState {
    username: string
    password: string
    image: ImageListType
}
interface SignupEvent {
    target: any
}
export class Signup extends Component<SignupProps, SignupState>{
    private authService: AuthService = new AuthService('')
    constructor(props: SignupProps) {
        super(props)
        this.state = {
            username: '',
            password: '',
            image: []
        }
        this.submitEvent.bind(this)
        this.onChange.bind(this)
    }
    private getUsername(event: SignupEvent) {
        this.setState({ username: event.target.value })
    }
    private getPassword(event: SignupEvent) {
        this.setState({ password: event.target.value })
    }
    private submitEvent = async (event: SyntheticEvent) => {
        event.preventDefault();
        let results: User | undefined = await this.authService.postLogin(this.state.username, this.state.password, 'http://localhost:8000/api/signup')
        if (results != undefined) {
            this.props.login(results)

        }
        console.log(results)
    }

    maxNumber = 69;

    onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        this.setState({ image: imageList as never[] });
    };
    render() {
        return (
            <>
                <form>
                    <ImageUploading
                        multiple
                        value={this.state.image}
                        onChange={(a, b) => this.onChange(a, b)}
                        maxNumber={this.maxNumber}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps
                        }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <Card
                                    style={isDragging ? { color: "red" } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </Card>
                                &nbsp;
                                <button onClick={onImageRemoveAll}>Remove all images</button>
                                {this.state.image.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image.dataURL} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            {index}
                                            <button onClick={() => onImageUpdate(index)}>Update</button>
                                            <button onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                    <input value={this.state.username} onChange={(e) => this.getUsername(e)} />
                    <input value={this.state.password} onChange={(e) => this.getPassword(e)} />
                    <input type='button' name='submit' onClick={this.submitEvent} />
                </form >
            </>
        )
    }
}