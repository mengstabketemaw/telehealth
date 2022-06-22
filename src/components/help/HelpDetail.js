import { Grid, Divider } from "@mui/material"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import HelpCard from "./HelpCard"
import mati from "../../api/repository"

export default function HelpDetail() {
  const { state } = useLocation()
  useEffect(() => {
    mati
      .get("api/Help/" + state.helpId)
      .then((data) => {})
      .catch(({ message }) => {})
  }, [])

  return (
    <Grid item mr={20}>
      <HelpCard data={state} />
      <br />
      <Divider />
      <br />
      <br />
    </Grid>
  )
}
