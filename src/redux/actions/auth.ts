import {useDispatch} from 'react-redux';
import {get, post, setItem} from '../../services/apiService';
import {GET_EXCEL_DATA, LOGIN, SEND_OTP, SIGNUP, VERIFY_OTP} from '../../services/routes';
import {showSuccess} from '../../utils/helperFunctions';
import {requestUserPermission} from '../../utils/notificationService';
import {setUserdata} from '../reducers/auth';
import store from '../store';
const {dispatch} = store;

export const sendOtp = async (userData:any) => {
    return await post(SEND_OTP, {data:userData})
     
  };
  export const verifyOtp = async (otpData:Object) => {
    const res =  await post(VERIFY_OTP, {data:otpData})
    setItem('userData', res?.data);
          dispatch(setUserdata(res?.data));
          showSuccess(res?.message);
    return res
  };
  
   export const onLogOut = () => {
    setItem('userData', null);
    dispatch(setUserdata(null as any));
   }

   export const getFile =async()=>{
    const res =  await get(GET_EXCEL_DATA)
    return res
   }