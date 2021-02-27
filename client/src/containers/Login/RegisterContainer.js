import { connect } from "react-redux";
import { registerUserAsync } from '../../actions/user';
import { setError } from "../../actions/error";
import Register from '../../components/Login/Register';

const mapDispatchToProps = (dispatch) => ({
    register: (username, email, password) => 
        dispatch(registerUserAsync(username, email, password)),
        setError: (message) => dispatch(setError(message))
});

export default connect(null, mapDispatchToProps)(Register);
