import MaterialTable from "material-table";
import * as React from 'react';
import { IDataHistory, FetchNextMessage, remove_job } from "../utils"

import { Delete } from "@material-ui/icons";


export const tableOptions = {
    showTitle: false
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
    //ejemplo de data que espera
    data =[
        {
          "date": "2022-10-7T11:31",
          "id_message": 36,
          "id_job": "c91380dfa4834255a060f8bf85a30b46",
          "id_RRSS": 1,
          "message": "prueba para el 7 de octubre",
          "url": "DOES NOT APPLY",
          "created_at": null
        }
      ]
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
                data={historyData}
                actions={[
                    (rowData: IDataHistory) => ({
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