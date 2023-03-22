import IResponse from '@/types/IResponse';
import IGatheringCenter from '@/types/IGatheringCenter'

const GatherinCenterService = {
    get: async (): Promise<IResponse> => {
        try {
            const response = await fetch(`${process.env.api}/api/users/ListarCentros`)
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
    store: async (gatheringCenter: IGatheringCenter): Promise<IResponse> => {
        try {
            const response = await fetch(`${process.env.api}/api/users/createCentros`, {
                body: JSON.stringify({
                    name: gatheringCenter.name,
                    lastname: gatheringCenter.owner,
                    phone: gatheringCenter.phone,
                    email: gatheringCenter.email,
                    password: gatheringCenter.password,
                    ci: gatheringCenter.ci,
                    direction: gatheringCenter.direction
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const dataJson = await response.json()
            return dataJson
        } catch (e) {
            console.log(e)
            return {
                success: false,
                message: 'ERROR'
            }
        }
    },
    delete: async (gatheringCenterId: number): Promise<IResponse> => {
        try {
            const response = await fetch(`${process.env.api}/api/user/delete/${gatheringCenterId}`, {
                method: 'DELETE',
            })
            const dataJson = await response.json()
            return dataJson
        } catch (e) {
            console.log(e)
            return {
                success: false,
                message: 'ERROR'
            }
        }
    },
    update: async (gatheringCenter: IGatheringCenter): Promise<IResponse> => {
        try {
            const response = await fetch(`${process.env.api}/api/users/updatecentroacopio/${gatheringCenter.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: gatheringCenter.name,
                    lastname: gatheringCenter.owner,
                    phone: gatheringCenter.phone,
                    email: gatheringCenter.email,
                    password: gatheringCenter.password,
                    ci: gatheringCenter.ci,
                    direction: gatheringCenter.direction
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const dataJson = await response.json()
            return dataJson
        } catch (e) {
            console.log(e)
            return {
                success: false,
                message: 'ERROR'
            }
        }
    }
}


export default GatherinCenterService