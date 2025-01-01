// import Jwt from "jsonwebtoken";
// class CreateTokens {
//     accessToken = (username: any, password: string) =>
//         Jwt.sign({_id: username, password}, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRE})
// }
import Jwt from "jsonwebtoken";
class CreateTokens {
    // accessToken = (id: any, role: string) =>
    //     Jwt.sign({_id: id, role}, process.env.JWT_KEY!, {expiresIn: process.env.JWT_EXPIRE})
    accessToken = (id: any, role: string) =>
        Jwt.sign({ _id: id, role }, process.env.JWT_KEY!, {
          expiresIn: process.env.JWT_EXPIRE
        });
    resetToken = (id: any) =>
        Jwt.sign({_id: id}, process.env.JWT_KEY!, {expiresIn: process.env.JWT_EXPIRE})
    
}



const createTokens = new CreateTokens();
export default createTokens;
// const createTokens = new CreateTokens();
// export default createTokens;
// class CreateTokens {
//     accessToken = (id: any, role: string) =>
//         Jwt.sign({username:user?.username,password:user.password,email:user.email}, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRE})
//     resetToken = (id: any) =>
//         Jwt.sign({_id: id}, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRE})
// }
// const token =Jwt.sign({username:user.username,password:user.password,email:user.email},process.env.JWT_KEY!,{expiresIn:process.env.JWT_EXPIRE})

// const createTokens = new CreateTokens();
// export default createTokens;

// export const createToken=(payload:any,role:string)=>{
//         Jwt.sign({_id: payload, role:role}, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRE})
// }
// export const createResetToken=(payload:any,role:string)=>{
//     Jwt.sign({_id: payload, role:role}, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_RESET_EXPIRE})




