import { Button, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import useToken from "../../hooks/useToken"
import requests from "../../api/repository"
const ApplyForHelp = () => {
  const { token } = useToken()
  const [desc, setDesc] = useState("")
  const [files, setFiles] = useState([])

  function submit() {
    const data = {
      requestorId: token.userId,
      body: desc,
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
            Upload All the necessary files
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
