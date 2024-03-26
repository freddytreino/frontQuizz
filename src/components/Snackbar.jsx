import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { hideSnackbar } from "../redux/snackbarSlice";
export function Snackbar() {
  const snackbarData = useSelector(state => state.snackbar);
  const dispatch = useDispatch()

  if (snackbarData.isActive) {
    return (
      <Alert variant={snackbarData.variant} onClose={() => dispatch(hideSnackbar())} dismissible>
        <Alert.Heading>{snackbarData.title}</Alert.Heading>
        <p>
         {snackbarData.message}
        </p>
      </Alert>
    );
  } 

  return <></>
}
