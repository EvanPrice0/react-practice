export interface User {
    _id: string,
    image: string,
    username: string,
    password: string,
    token?: string
}
export interface pictureCardInterface {
    _id: string,
    name: string,
    description: string
}

export interface blogInterface {
    _id: string,
    name: string,
    date: string,
    content: string,
    comments: Comment[]
}

export interface Comment {
    _id: string,
    date: string,
    user_id: string,
    username: string,
    blog_id: string,
    comment: string,
    title: string,
    responses: Comment[]
}
export interface Links {
    _id: string,
    path: string,
    name: string,
    className: string,
    callback?: () => void
}