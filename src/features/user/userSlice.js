import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import Auth from "../../api/Auth"

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ url, value, setToken, nav }) => {
    const auth = new Auth(null, setToken)
    const response = await auth.user(url, value)
    nav("/user/" + response.role.toLowerCase())
    return { id: response.id, role: response.role, username: response.username }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: { status: "nothing", data: "none" },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success"
        state.data = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error"
        state.error = action.error.message
      })
  },
})

export default userSlice.reducer
