import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import ProfileSideBar from "../components/Profile/ProfileSideBar.jsx"
import ProfileContent from "../components/Profile/ProfileContent.jsx"

function ProfilePage() {
  const [active, setActive] = useState(1)
  return (
    <div>
        <Header />
        <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
                <div className="800px:w-[335px] w-[50px] ">
                    <ProfileSideBar active={active} setActive={setActive} />
                </div>
                <ProfileContent active={active} />
        </div>
    </div>
  )
}

export default ProfilePage