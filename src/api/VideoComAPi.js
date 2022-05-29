import axios from "axios";
import Config from "./Config";

export const createRoom = async () => {
    const { data } = axios.get(Config.VIDEOSERVER + "/video-api/create-room");
    console.warn("Room has been create with the following property: ", data);
    return data;
};

export const validateRoom = async (meetingId) => {
    try {
        await axios.get(`${Config.VIDEOSERVER}/video-api/validate-room/${meetingId}`);
        return true;
    } catch (error) {
        return false;
    }

};

export const deleteRoom = async (username) => {
    try {
        axios.get(Config.VIDEOSERVER + "/video-api/delete-room/" + username)
    } catch (error) {
        console.log(error);
    }
}

export const getRoom = async (username) => {
    try {
        const { data } = axios.get(Config.VIDEOSERVER + "/video-api/get-room/" + username)
        return data;
    } catch (error) {
        console.log(error)
        return null;
    }
}