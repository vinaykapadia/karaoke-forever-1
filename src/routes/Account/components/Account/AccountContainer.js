import { connect } from 'react-redux'
import Account from './Account'
import { loginUser } from 'store/modules/user'

const mapActionCreators = {
  loginUser,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLoggedIn: state.user.userId !== null,
    isFirstRun: state.prefs.isFirstRun === true,
  }
}

export default connect(mapStateToProps, mapActionCreators)(Account)
