import {Schema, model} from 'mongoose';

interface User {
    name?: string
    email?: string,
    password?: string,
    createdAt?: Date
    updatedAt?: Date
}

const schema = new Schema<User>(
    {
    name: {type: String, required: true, unique:true },
    email: {type: String, required: true },
    password: {type: String, required: true},
    createdAt: Date,
    updatedAt: Date
    },{
    timestamps: true
});

const UserModel = model('User', schema);

export default UserModel;