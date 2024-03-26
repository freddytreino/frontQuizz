import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/Routes";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./redux/authSlice";
import { Snackbar } from "./components/Snackbar";
import { Row, Col } from "react-bootstrap";

export function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (loggedUser && loggedUser.email) {
    dispatch(login(loggedUser));
  }

  return (
    <>

      <BrowserRouter>
        <AppRoutes isAuthenticated={!isAuthenticated} />
      </BrowserRouter>

      <Row className="justify-content-center" >
        <Col xs={12} md={5}>
          <Snackbar></Snackbar>
        </Col>
      </Row>
    </>
  );
}


