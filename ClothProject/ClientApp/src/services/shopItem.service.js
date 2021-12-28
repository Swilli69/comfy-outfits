﻿import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/ShopItems/";

class ShopItemService {
    getShopItems(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createShopItem(name, price, amount, size, colour, clothCategoryId, clothTypeId, shopId) {
        return axios.post(API_URL + "create", { name, price, amount, size, colour, clothCategoryId, clothTypeId, shopId }, { headers: authHeader() });
    }

    deleteShopItem(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editShopItem(shopItemId, name, price, amount, size, colour, clothCategoryId, clothTypeId) {
        return axios.put(API_URL + "edit/" + shopItemId, { shopItemId, name, price, size, colour, clothCategoryId, clothTypeId, amount }, { headers: authHeader() });
    }
}

export default new ShopItemService();