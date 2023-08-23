import {Schema, model} from "mongoose";

interface ClientInterface {
    name: string,
    email: string,
    password: string,
    token: string,
    age?: number,
}

const clientSchema = new Schema<ClientInterface>(
    {
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
    }
);

const ClientModel = model('client', clientSchema);

export default ClientModel;