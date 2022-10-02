import MaterialTable from "material-table";
import * as React from 'react';
import { IDataHistory, FetchNextMessage, remove_job } from "../utils"

import { Delete } from "@material-ui/icons";


export const tableOptions = {
    showTitle: false,
    actionsColumnIndex: -1
}

export const NextMessages = () => {
    const [flagUpdate, setFlagUpdate] = React.useState(true)
    const [historyData, setHistoryData] = React.useState<IDataHistory[]>([])

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

            setHistoryData(data)
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
                    { title: 'created_at', field: 'updated_at' }
                ]}
                data={historyData}
                actions={[
                    (rowData: IDataHistory) => ({
                        tooltip: 'Remove Job',
                        icon: () => <Delete style={{ color: "red" }}/>,
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