import { Avatar } from "@mui/material"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import DoctorProfile from "./DoctorProfile"

const Consultants = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState({ open: false })

  const handleView = (arg) => {
    setOpenDialog({ open: true, ...arg })
  }

  const column = [
    {
      field: "img",
      headerName: "Avatar",
      width: "100",
      renderCell: ({ value }) => {
        return (
          <Avatar
            src={value}
            sx={{ width: "100px", height: "100px" }}
            variant="square"
          />
        )
      },
    },
    {
      field: "name",
      flex: 1,
      headerName: "Name",
    },
    {
      field: "specialization",
      flex: 1,
      headerName: "Specialization",
    },
    {
      field: "consultation",
      headerName: "Consultation",
      type: "boolean",
    },
    {
      field: "homedoctor",
      headerName: "Home Doctor",
      type: "boolean",
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            label="View Profile"
            onClick={() => handleView(params.row)}
            color="primary"
            showInMenu
          />,
          <GridActionsCellItem
            label="Schedule Appointment"
            showInMenu
            onClick={() => handleView(params.row)}
          />,
        ]
      },
    },
  ]

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((da) => {
        const { results } = da
        const dola = results.map((e, i) => ({
          id: i,
          name: `${e.name.title} ${e.name.first} ${e.name.last}`,
          specialization: e.email,
          img: e.picture.large,
          homedoctor: false,
          consultation: true,
        }))
        setData(dola)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setData([
          {
            id: 1,
            name: "Mengstab",
            img: "asdfasdf",
            homedoctor: true,
            consultation: true,
            specialization: "This is specailization",
          },
        ])
      })
  }, [])

  return (
    <>
      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rowHeight={100}
          hideFooter
          rows={data}
          columns={column}
          loading={loading}
        />
        <DoctorProfile
          {...openDialog}
          handleClose={() => setOpenDialog({ open: false })}
        />
      </div>
    </>
  )
}

export default Consultants
