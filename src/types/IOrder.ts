import IClient from "./IClient"
interface IOrder{
    status: string,
    evidencia: string,
    client?: IClient,
    empresa?: IClient,
    cantidad_aprox: number,
    id: number,
    observation?:string
}

export default IOrder