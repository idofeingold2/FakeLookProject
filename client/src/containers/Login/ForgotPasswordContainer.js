import { connect } from "react-redux";
import { updateUserAsync } from '../../actions/user';
import ForgotPassword from '../../components/Login/ForgotPassword';

const mapDispatchToProps = (dispatch) => ({
    update: (user) => dispatch(updateUserAsync(user)),
});

export default connect(null, mapDispatchToProps)(ForgotPassword);