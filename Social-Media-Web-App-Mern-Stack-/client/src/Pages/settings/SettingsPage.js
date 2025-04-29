import ProfileSide from "../../Components/profileSide/ProfileSide"
import RightSide from "../../Components/RightSide/RightSide"
import Settings from "../../Components/Settings/Settings"
import './SettingsPage.css'

const SettingsPage = () => {
    return (
        <div className="SettingsPage">
            <ProfileSide />
            <Settings />
            <RightSide />
        </div>
    )
}

export default SettingsPage