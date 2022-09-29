export interface elementsTabs {
    name: string,
    link: JSX.Element

}

export interface kukunTab {
    name: string,
    linkTo: string,
    content: string
}

export const kukunListTab: kukunTab[] = [
    { name: "Scheduler", linkTo: "/scheduler", content:"scheduler" },
    { name: "Reports", linkTo: "/reports", content:"reports details" },

]

export const FetchUrl = async (): Promise<[any, any]> => {
    try {
        
        // let response = await fetch();
        // response = await response.json()

        return ["response", null]
    } catch (error) {
        return [null, error]
    }
}