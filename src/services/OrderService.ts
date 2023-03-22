import IResponse from '@/types/IResponse';
import IOrder from "@/types/IOrder";

const OrderService = {
    getByStatus: async (status: string): Promise<IResponse> => {
        try {
            const response = await fetch(`${process.env.api}/api/orders/finSolicitudes/${status}`)
            const dataJson = await response.json()
            return dataJson
        } catch (e) {
            console.log(e)
            return {
                success: false,
                message: 'Error',
            }
        }
    },
    accept: async (order: IOrder): Promise<IResponse> => {
        try {
            const token = localStorage.getItem('token')
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('Authorization', token || '');
            const response = await fetch(`${process.env.api}/api/orders/updateToOnInnomine`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: order.id,
                    id_delivery: order.empresa == null ? 0 : order.empresa.id,
                    observation: order.observation

                }),
                headers: requestHeaders
            })
            const dataJson = await response.json()
            return dataJson

        } catch (e) {
            console.log(e)
            return {
                success: false,
                message: 'Error',
            }
        }
    },
    deny: async (order: IOrder): Promise<IResponse> => {
        try {
            const response = await fetch(`${process.env.api}/api/orders/updateToOfInnomine`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: order.id,
                    id_delivery: order.empresa == null ? 0 : order.empresa.id,
                    observation: order.observation

                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const dataJson = await response.json()
            return dataJson

        } catch (e) {
            console.log(e)
            return {
                success: false,
                message: 'Error',
            }
        }
    },
    getOrderProductoByStatus: async (state: string) => {
        try {
            const token = localStorage.getItem('token')
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Authorization', token || '');
            const response = await fetch(`${process.env.api}/api/orderpremio/${state}`, {
                headers: requestHeaders
            })
            const dataJson = await response.json()
            return dataJson

        } catch (e) {
            console.log(e)
            return {
                success: false,
                message: 'Error',
            }
        }
    },
    updateToEntregado: async (orderid: number) => {
        try {
            const token = localStorage.getItem('token')
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Authorization', token || '');
            const response = await fetch(`${process.env.api}/api/entregarorder/${orderid}`, {
                headers: requestHeaders,
                method: 'PUT'
            })
            const dataJson = await response.json()
            return dataJson

        } catch (e) {
            console.log(e)
            return {
                success: false,
                message: 'Error',
            }
        }
    }
}

export default OrderService