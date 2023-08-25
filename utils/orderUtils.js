import OrderModel from "../model/order.js";
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