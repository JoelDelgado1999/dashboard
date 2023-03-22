import ILoginForm from "../types/ILoginForm"
import IResponse from '@/types/IResponse';
const AuthenticationService = {
    login: async (loginForm: ILoginForm): Promise<IResponse> => {
        try {

            const response = await fetch(`${process.env.api}/api/login/dashboard`, {
                body: JSON.stringify(loginForm),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const dataJson = await response.json()

            return dataJson;
        } catch (e) {
            console.log(e)
            return {
                success: false,
                message: 'Credenciales no encontradas',
            }
        }

    },
}

export default AuthenticationService