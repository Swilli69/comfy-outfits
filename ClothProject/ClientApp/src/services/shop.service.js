import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Shops/";

class ShopService {
    getShops() {
        return axios.get(API_URL + "all", { headers: authHeader() });
    }

    createShop(name, address) {
        return axios.post(API_URL + "create", { name, address }, { headers: authHeader() });
    }

    deleteShop(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editShop(shopId, name, address) {
        return axios.put(API_URL + "edit/" + shopId, { shopId, name, address }, { headers: authHeader() });
    }
}

export default new ShopService();