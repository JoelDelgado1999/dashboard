// Utilities
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import IUserProfile from '@/types/IUserProfile'
export const useAppStore = defineStore('app', () => {
  const user:IUserProfile = reactive({name: '', session_token: '', email: '', id: 0, image: ''})

  function setUser(userProfile: IUserProfile) {
    user.name = userProfile.name
    user.email = userProfile.email
    user.session_token = userProfile.session_token
    user.id = userProfile.id
    user.image = userProfile.image
    localStorage.setItem('user_data', JSON.stringify(userProfile))
    localStorage.setItem('token', userProfile.session_token)
  }



  return { user, setUser }
})
