import * as Constants from "./Constants"
export interface elementsTabs {
    name: string,
    link: JSX.Element

}

export interface elementTab {
    name: string,
    linkTo: string,
    content: string
}

export const ListTab: elementTab[] = [
    { name: "Scheduler", linkTo: "/scheduler", content:"scheduler" },
    { name: "Reports", linkTo: "/reports", content:"reports details" },
    { name: "Upcoming ", linkTo: "/next", content:"next messages details" },

]

// export const FetchUrl = async (): Promise<[any, any]> => {
//     try {
        
//         // let response = await fetch();
//         // response = await response.json()

//         return ["response", null]
//     } catch (error) {
//         return [null, error]
//     }
// }

export interface IDataReaction {
    "date": string,
    "id_message": number,
    "id_job": string,
    "id_RRSS": number,
    "message": string,
    "url": string,
    "created_at": null
}

export const FetchNextMessage = async (): Promise<[any, any]> => {
    try {
        
        let response = await fetch(Constants.URL_BASE+Constants.URL_NEXT_MESSAGE);
        response = await response.json()

        return [response, null]
    } catch (error) {
        return [null, error]
    }
}


export const remove_job = async (id: string) => {
    await fetch(Constants.URL_BASE+Constants.URL_STOP_JOB+"?id="+id)
}
