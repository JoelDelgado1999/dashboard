import IUserProfile from "./IUserProfile"
interface IResponse{
    success: boolean,
    message: string,
    data?: IUserProfile
}
export default IResponse