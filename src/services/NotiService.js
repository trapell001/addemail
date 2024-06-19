import axios from "axios";

const noti_url = "http://66.23.232.230/api/noti";
// const noti_url = "http://localhost:8080/api/noti";

class NotiService {
    getNoti() {
        return axios.get(noti_url);
    }

    createNoti(noti) {
        return axios.post(noti_url, noti);
    }

    getNotiId(notiId) {
        return axios.get(noti_url + "/" + notiId);
    }

    updateNoti(noti, notiId) {
        return axios.put(noti_url + "/" + notiId, noti);
    }

    deleteNoti(notiId) {
        return axios.delete(noti_url + "/" + notiId);
    }
    // _______________NOTI _________
}


export default new NotiService();
