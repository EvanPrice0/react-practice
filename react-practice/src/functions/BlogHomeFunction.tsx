import { FC, Fragment } from "react";
import { pictureCardInterface } from "../interface/user";
import { useBlogContext } from "../hooks/context";
import Blog from "../Tools/Blog";
import NewBlog from '../Tools/NewBlog'
import PersonCard from "../Tools/PersonCard";


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

export const BlogHomeFunction: FC<{}> = () => {
    const linnet = { _id: '0', name: "Linnet Mbogo", description: "Welcome to my Blog" }
    const { addBlog, getBlogs } = useBlogContext()
    const getTheBlogs = (): any[] => {
        const row: any[] = []
        console.log('blogs', getBlogs)
        getBlogs.forEach((iterator) => {
            row.push(<div key={iterator.name} style={{
                flex: "1 1 250px",
            }}>
                <Blog key={iterator.name} {...iterator} />
            </div>)
        })
        console.log(row)
        return row;
    }

    return (
        <Fragment>
            <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
                {getTheBlogs()}
            </div>
        </Fragment>)
}
// //     private showCards = () => {
// //         const row = []
// //         for (const iterator of cards) {
// //             row.push(<div key={iterator.name} style={{
// //                 flex: "1 1 250px",
// //                 maxWidth: "250px"
// //             }}>
// //                 <PictureCard {...{ _id: '0', name: iterator.name, description: iterator.description }} />

// //             </div>)
// //         }
// //         return row
// //     }

export default BlogHomeFunction;