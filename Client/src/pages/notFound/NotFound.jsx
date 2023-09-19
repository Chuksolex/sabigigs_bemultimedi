import { useNavigate} from "react-router-dom";
import "./NotFound.css"

export default function NotFound() {
    const navigate = useNavigate()
function goToHome(){
  navigate("/")
}
function pointer(){

}

    return (
       
        <div class="container text-center h-100"  style={{height: "100vh"}}>
                 <h1>Oops! 404! That Page requested not found.</h1>
                 <p onClick={goToHome} role="button">Go to Home: </p>

            </div>
 

    )
    }