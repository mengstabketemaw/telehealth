import { Button, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import useToken from "../../hooks/useToken"
import requests from "../../api/repository"
import { useSnackbar } from "./Patient"

const ApplyForHelp = () => {
  const { token } = useToken()
  const [desc, setDesc] = useState("")
  const [files, setFiles] = useState([])
  const { setSnackbar } = useSnackbar()

  async function submit() {
    var filename = ""
    var data = {
      requestorId: token.userId,
      body: desc,
    }

    if (files.length !== 0) {
      const dat = new FormData()
      dat.append("file", files[0])
      var type = ""
      if (files[0].type.includes("image")) {
        type = "IMAGE"
      } else if (files[0].type.includes("video")) {
        type = "VIDEO"
      } else if (files[0].type.includes("pdf")) {
        type = "PDF"
      } else {
        type = "UNKNOWN"
      }

      await requests
        .post("api/File/upload", dat)
        .then((data) => {
          filename = String(data)
          setSnackbar({
            children:
              "Help request sent successfully, Please wait for approval",
            open: true,
            severity: "success",
          })
          setDesc("")
          setFiles([])
        })
        .catch((e) => {
          setSnackbar({
            children: "Help request is not sent" + e,
            open: true,
            severity: "error",
          })
        })

      data = {
        requestorId: token.userId,
        body: desc,
        filename: String(filename),
        type: String(type),
      }
    }

    requests.post("api/Help", data)
  }
  return (
    <>
      <br />
      <Typography variant="h4" color="primary">
        Apply For Help
      </Typography>
      <br />
      <Stack spacing={3}>
        <TextField
          label={"Briefly explain what the problem is"}
          multiline
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={10}
          fullWidth
        />
        <label>
          <input
            style={{ display: "none" }}
            accept="*"
            id="contained-button-file"
            files={files}
            multiple
            type="file"
            onChange={(e) => setFiles(Object.values(e.target.files))}
          />
          <Button variant="contained" color="info" component="span">
            Upload the necessary file
          </Button>
        </label>
        {files.map((e, i) => (
          <Typography key={i} variant="caption">
            {e?.name}
          </Typography>
        ))}
        <Button variant="contained" onClick={submit}>
          Submit
        </Button>
      </Stack>
    </>
  )
}
export default ApplyForHelp
