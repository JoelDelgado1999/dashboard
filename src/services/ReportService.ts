

const ReportService = {
    quantityOfOrderByCentroAcopio: async () => {
        try {
            const response = await fetch(`${process.env.api}/api/report/centroacopioquantity`)
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
    weightOfCentrosAcopio: async () => {
        try {
            const response = await fetch(`${process.env.api}/api/report/centroacopioweight`)
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
    productsTotal: async () => {
        try {
            const response = await fetch(`${process.env.api}/api/products/report`)
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
    premiosDetalleTable: async (rangeDates: any) => {
        try {
            const response = await fetch(`${process.env.api}/api/orders/premio2/${rangeDates.start}/${rangeDates.end}`)
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
    ordenesDetalleTable: async (rangeDates: any) => {
        try {
            const response = await fetch(`${process.env.api}/api/orders/withclientstoprint/${rangeDates.start}/${rangeDates.end}`)
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
    ordenesWeightTable: async (rangeDates: any) => {
        try {
            const response = await fetch(`${process.env.api}/api/orders/withweight/${rangeDates.start}/${rangeDates.end}`)
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
}

export default ReportService