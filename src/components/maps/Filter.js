import { LoadingButton } from "@mui/lab";
import { Autocomplete, Slider, Stack, TextField, Typography } from "@mui/material";
import { useSearch } from "./SearchWrapper";


const Filter = () => {
    const { filterState, search } = useSearch();

    const handleChange = (key) => (e, v) => {
        search({ ...filterState, [key]: v });
    }
    return <>
        <Stack spacing={5} style={{ padding: 12 }} width={"200px"}>
            <Stack>
                <Typography>Distance your Location</Typography>
                <Slider
                    min={10}
                    max={300000}
                    valueLabelDisplay={"auto"}
                    value={filterState.distance}
                    onChange={handleChange("distance")}
                />
                <Typography variant="caption" fontSize={10} color={"InfoText"}>Distance: {filterState.distance / 1000}km</Typography>
            </Stack>
            <Autocomplete
                multiple
                options={specializations}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Specialization"
                        placeholder="General Doctors"
                    />
                )}
                onChange={handleChange("specialization")}
            />

            <TextField
                variant="standard"
                label="DoctorNames" />
            <LoadingButton loading={false}>Apply</LoadingButton>
        </Stack>
    </>
}

const specializations = [
    { title: "speciality", value: 1 },
    { title: "speciality1", value: 2 },
    { title: "speciality2", value: 3 },
    { title: "speciality3", value: 4 },
    { title: "speciality4", value: 5 },
    { title: "speciality5", value: 6 },
]
export default Filter;