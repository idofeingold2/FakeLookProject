import { connect } from "react-redux";
import { setUser } from '../../actions/user';
import { setError } from '../../actions/error';

import Login from '../../components/Login/Login';

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
    setError: (message) => dispatch(setError(message))
});

export default connect(null, mapDispatchToProps)(Login)