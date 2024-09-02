import { useAppStore } from "@/store"


function Profile() {

  const {userInfo}= useAppStore()

  return (
    <div>
      Profile Page
      <div>Email:{userInfo.email}</div>
      
        
    </div>
  )
}

export default Profile
