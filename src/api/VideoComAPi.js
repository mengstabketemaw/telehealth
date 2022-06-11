import axios from "axios"
import Config from "./Config"

class VIDEOAPI {
  VIDEO_API_BASE = `${Config.VIDEOSERVER}/video-api`
  CREATE_ROOM = `${this.VIDEO_API_BASE}/create-room`
  VALIDATE_ROOM = `${this.VIDEO_API_BASE}/validate-room/`
  DELETE_ROOM = `${this.VIDEO_API_BASE}/delete-room/`
  GET_ROOM = `${this.VIDEO_API_BASE}/get-room/`
  CREATE_THERAPY_GROUP = `${this.VIDEO_API_BASE}/create-therapy-group`
  THERAPY_GROUPS = `${this.VIDEO_API_BASE}/therapy-groups`
  DOCTOR_THERAPY_GROUPS = `${this.THERAPY_GROUPS}/doctor/`
  PATIENT_THERAPY_GROUPS = `${this.THERAPY_GROUPS}/patient/`
  JOIN_THERAPY_GROUP = `${this.VIDEO_API_BASE}/join-therapy-group/`

  get(url, success, failure) {
    axios
      .get(url)
      .then(({ data }) => success(data))
      .catch(({ message }) => failure(message))
  }

  post(url, data, success, failure) {
    axios
      .post(url, data)
      .then(({ data }) => success(data))
      .catch(({ message }) => failure(message))
  }

  delete(url, success, failure) {
    axios
      .delete(url)
      .then(({ data }) => success(data))
      .catch(({ message }) => failure(message))
  }
}

export default new VIDEOAPI()
