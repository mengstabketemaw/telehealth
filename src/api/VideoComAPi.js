import axios from "axios";
import Config from "./Config";

class VIDEOAPI {
    VIDEO_API_BASE = `${Config.VIDEOSERVER}/video-api`;
    CREATE_ROOM = `${this.VIDEO_API_BASE}/create-room`;
    VALIDATE_ROOM = `${this.VIDEO_API_BASE}/validate-room/`;
    DELETE_ROOM = `${this.VIDEO_API_BASE}/delete-room/`;
    GET_ROOM = `${this.VIDEO_API_BASE}/get-room/`;

    videoClient(url, success, failure) {
        axios.get(url)
            .then(({ data }) => success(data))
            .catch(({ message }) => failure(message));
    };

    createRoom(data, success, failure) {
        axios.post(this.CREATE_ROOM, data)
            .then(({ data }) => success(data))
            .catch(({ message }) => failure(message));
    }

}

export default new VIDEOAPI();