import { CREATE_SHOPITEM_SUCCESS, DELETE_SHOPITEM_SUCCESS, EDIT_SHOPITEM_SUCCESS, GET_SHOPITEMS } from "../constants/shopItem";

const initialState = {
    name: "",
    address: "",
    shopItems: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SHOPITEMS:
            return {
                name: payload.name,
                address: payload.address,
                shopItems: payload.shopItems
            }
        case CREATE_SHOPITEM_SUCCESS:
            return {
                ...state,
                shopItems: [...state.shopItems, payload.shopItem]
            }
        case DELETE_SHOPITEM_SUCCESS:
            return {
                ...state,
                shopItems: state.shopItems.filter(x => x.shopItemId !== payload.id)
            }
        case EDIT_SHOPITEM_SUCCESS:
            return {
                ...state,
                shopItems: state.shopItems.map(item => {
                    if (item.shopItemId === payload.shopItemId)
                        return {
                            ...item,
                            name: payload.name,
                            price: payload.price,
                            amount: payload.amount,
                            size: payload.size,
                            colour: payload.colour,
                            clothCategoryId: payload.clothCategoryId,
                            clothCategory: payload.clothCategory,
                            clothTypeId: payload.clothTypeId,
                            clothType: payload.clothType
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}