import { Links } from "../interface/user"
import LinkList from "./LinkList"





export const SideNavFunction = (props: Links[]) => {
    return <>
        <LinkList links={props} />
    </>
}
export default SideNavFunction