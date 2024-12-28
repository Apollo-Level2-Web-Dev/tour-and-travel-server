import config from '../../config'
import sendMail from '../../utils/sendEmail'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}

const login = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select('+password');

  if (!user) {
    throw new Error('This user is not found !')
  }

  // checking if the user is inactive
  const userStatus = user?.userStatus

  if (userStatus === 'inactive') {
    throw new Error('This user is blocked ! !')
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )

  if (!isPasswordMatched) {
    throw new Error('Wrong Password!!! Tell me who are you? 😈')
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const token = jwt.sign(jwtPayload, "secret", { expiresIn: '1d' });

  return {token, user};
}

const forgetPassword = async(payload: {email: string})=>{
  const user = await User.findOne({
    email: payload.email
  })

  if(!user){
    throw new Error('User not found!');
  }

  if(user?.userStatus === 'inactive'){
    throw new Error('User is blocked!')
  }

   //create token
   const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const token = jwt.sign(jwtPayload, "secret", { expiresIn: '1h' });
  
  const resetLink = `http://localhost:5173/reset-password?_id=${user?._id}&token=${token}`

  console.log(resetLink);
  await sendMail(user?.email, "Reset password link", resetLink);
}

const resetPassword = async(payload: {userId: string, token:string, password: string})=>{
  const user = await User.findById(payload.userId)

  if(!user){
    throw new Error('User not found!')
  }

  if(user?.userStatus === 'inactive'){
    throw new Error('User is blocked!')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  jwt.verify(payload.token, "secret", (err, decoded)=>{
    if(err){
      throw new Error('Invalid or expired token')
    }
  })

  //hash the new password
  payload.password = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds) )

  user.password = payload.password

  console.log(user?.password)

  const result = await User.findByIdAndUpdate(user._id, user, {new: true})

  return result;
}

export const AuthService = {
  register,
  login,
  forgetPassword,
  resetPassword 
}
