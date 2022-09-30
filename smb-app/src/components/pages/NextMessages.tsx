import MaterialTable from "material-table";
import * as React from 'react';
import { IDataReaction, FetchNextMessage, remove_job } from "../utils"

import { Delete } from "@material-ui/icons";


export const tableOptions = {
    showTitle: false
}

export const NextMessages = () => {
    const [flagUpdate, setFlagUpdate] = React.useState(true)
    const [reactionData, setReactionData] = React.useState<IDataReaction[]>([])

    const fetchAPIEffect = () => {
        async function fetchMyAPI() {
            const [data, error] = await FetchNextMessage()

            if (error) {
                console.error('_______________________')
                console.error('something went wrong (status)!!!')
                console.error(error)
                console.error('_______________________')
                return
            }

            setReactionData(data)
        }
        fetchMyAPI()
    }
    React.useEffect(fetchAPIEffect, [flagUpdate])
    return (
        <>
            <MaterialTable
                title='Next Messages'
                columns={[
                    { title: 'date', field: 'date' },
                    { title: 'Id Message', field: 'id_message' },
                    { title: 'Id_job', field: 'id_job' },
                    { title: 'RRSS', field: 'id_RRSS' },
                    { title: 'Message', field: 'message' },
                    { title: 'Url', field: 'url' },
                    { title: 'created_at', field: 'created_at' }
                ]}
                data={reactionData}
                actions={[
                    (rowData: IDataReaction) => ({
                        tooltip: 'Remove Job',
                        icon: () => <Delete />,
                        onClick: () => {
                            remove_job(rowData.id_job)
                            setFlagUpdate(!flagUpdate)

                        },
                    })
                ]}
                options={tableOptions}
            />
        </>)
}