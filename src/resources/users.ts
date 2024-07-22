import {Context} from 'koa';
import  UserModel  from '../Models/User';
import { generateToken } from '../functions/create-token';
import { encrypt } from '../functions/secure-data';


type userInput = {
    name: string,
    email: string,
    password:string
}

 const addUser = async (ctx:Context) => {
    const {name, email, password} = ctx.request.body as userInput
    if (!name) {
        ctx.throw(400, {
            message: "please enter name!"
        })
    }
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        ctx.status = 400;
        ctx.body = { message: 'User already exists' };
        return;
    }


    const user = await UserModel.create({
        name,email, password: await encrypt(password)
    })

    const token = generateToken(user)
    ctx.status = 201;
    ctx.body = { message: 'User registered successfully' , token : token};

}

export {addUser}
