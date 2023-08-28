import { Schema, model } from "mongoose";
const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    age: Number,
});
const ClientModel = model('client', clientSchema);
export default ClientModel;
//# sourceMappingURL=client.js.map