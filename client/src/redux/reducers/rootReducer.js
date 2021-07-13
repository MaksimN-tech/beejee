import { combineReducers } from 'redux'
import adminReducer from './adminReducer'
import taskReducer from './taskReducer'


const rootReducer = combineReducers({
  tasks: taskReducer,
  admin: adminReducer,
})

export default rootReducer
