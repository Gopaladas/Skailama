import {
  Link,
  useLocation,
  useParams,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import logout from "../../assets/logout.png";
import "./BreadCrumbs.css";
import axios from "axios";
import { authApi } from "../../mainApi";
import { useDispatch } from "react-redux";
import { setLogin, setLogout } from "../../redux/authSlice";

const Breadcrumbs = () => {
  const location = useLocation();
  const { projectId, episodeId } = useParams();
  const { data } = useOutletContext() || {};
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const routeNames = {
    "": "Home",
    project: "Project",
    edit: "Edit Transcript",
    "add-podcast": "Add Podcast",
  };

  const isMongoId = (str) => /^[0-9a-fA-F]{24}$/.test(str);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${authApi}/logout`);
      console.log(res);
      if (res.data.success) {
        console.log("logout successfully");
        dispatch(setLogout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="breadcrumb top-divide">
      <div>
        <p>
          Home/
          {pathnames.map((name, index) => {
            if (isMongoId(name)) return null;

            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            let displayName = routeNames[name] || name.replace(/-/g, " ");

            if (name === projectId)
              displayName = data?.projectName || "Project";
            if (name === "edit" && episodeId) displayName = "Edit Transcript";

            return isLast ? (
              <span key={name}>
                {index > 0 && " / "}
                <span>{displayName}</span>
              </span>
            ) : (
              <span key={name}>
                {index > 0 && " / "}
                <Link to={routeTo}>{displayName}</Link>
              </span>
            );
          })}
        </p>
      </div>
      <div>
        <button onClick={handleLogout}>
          <img src={logout} className="logout" />
        </button>
      </div>
    </div>
  );
};

export default Breadcrumbs;
