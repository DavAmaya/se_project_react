import "./SideBar.css";
import avatarDefault from "../../assets/avatar.svg";

export default function SideBar() {
  const username = "Terrence Tegegne";
  const avatar = avatarDefault;
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <span className="sidebar__username">{username}</span>
        {avatar ? (
          <img className="sidebar__avatar" src={avatar} alt="Avatar"></img>
        ) : (
          <span className="sidebar__avatar sidebar__avatar_none">
            {username.toUpperCase().charAt(0) || ""}
          </span>
        )}
      </div>
    </div>
  );
}
