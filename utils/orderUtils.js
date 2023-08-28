import OrderModel from "../model/order.js";
/**
 * Creates a new order.
 * @param orderData : {country, city, address, phone} - order information of the user
 * @param cart : CartInterface - the cart of the user
 * @returns OrderInterface - the new order
 */
export const createNewOrder = async (orderData, cart) => {
    const order = new OrderModel({
        country: orderData.country,
        city: orderData.city,
        address: orderData.address,
        phone: orderData.phone,
        cart: cart,
    });
    return await order.save();
};
