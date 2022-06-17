import { Avatar, Typography } from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { randomeUser } from "../../api/client"
const Activity = () => {
  const [data, setData] = useState({ row: [], loading: true })
  const handleViewProfile = (row) => {
    console.log(row)
  }
  const handleViewMedicalRecord = (row) => {
    console.log(row)
  }
  const column = [
    {
      field: "img",
      headerName: "Avatar",
      width: "100",
      renderCell: ({ value }) => {
        return (
          <Avatar src={value} sx={{ width: "70px", height: "70px" }}>
            value
          </Avatar>
        )
      },
    },
    {
      field: "patientname",
      flex: 1,
      headerName: "Patient Name",
    },
    {
      field: "type",
      flex: 1,
      headerName: "Type",
    },
    {
      field: "datetime",
      flex: 1,
      headerName: "Date Time",
      type: "dateTime",
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            label="View Profile"
            onClick={() => handleViewProfile(params.row)}
            showInMenu
          />,
          <GridActionsCellItem
            label="See Medical Record"
            onClick={() => handleViewMedicalRecord(params.row)}
            showInMenu
          />,
        ]
      },
    },
  ]

  useEffect(() => {
    randomeUser
      .get()
      .then((response) => response.data)
      .then((da) => {
        const { results } = da
        const dola = results.map((e, i) => ({
          id: i,
          img: e.picture.large,
          patientname: `${e.name.title} ${e.name.first} ${e.name.last}`,
          type: e.email,
          datetime: e.dob.date,
        }))
        setData({ row: dola, loading: false })
      })
      .catch(() => {
        setData({
          row: [
            {
              id: 1,
              name: "Mengstab",
              img: "asdfasdf",
              homedoctor: true,
              consultation: true,
              specialization: "This is specailization",
            },
          ],
          loading: false,
        })
      })
  }, [])

  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Todays Activity
      </Typography>
      <br />
      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rowHeight={100}
          hideFooter
          rows={data.row}
          loading={data.loading}
          columns={column}
        />
      </div>
    </>
  )
}
export default Activity
