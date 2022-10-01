import { TabsComponent } from "../TabsComponent"
import { elementsTabs } from "../utils"
import { NotFound } from "./NotFound"
import { FacebookStats } from "./FacebookStats"

export const Reports = () =>{
    let a: elementsTabs = { name: "Facebook", link: <FacebookStats /> }
    let b: elementsTabs = { name: "Instagram", link: <NotFound /> }
    let l: elementsTabs[] = [a, b]
    return (<TabsComponent listItem={l} />)
}