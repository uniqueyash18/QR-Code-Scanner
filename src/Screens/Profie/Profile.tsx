import {View, Text, Image} from 'react-native';
import React, {FC, useState} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import Header from '../../Components/Header';
import {t} from 'i18next';
import imagePath from '../../constants/imagePath';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {styles} from './styles';
import {CustomTextInput} from '../../Components/CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ScrollView} from 'react-native-gesture-handler';
import GradientButton from '../../Components/GradientButton';
import usePostData from '../../hooks/usePostData';
import { UPDATE_USER_DATA } from '../../services/routes';
import { setItem } from '../../services/apiService';
import { setUserdata } from '../../redux/reducers/auth';
import { showError, showSuccess } from '../../utils/helperFunctions';
interface Proptypes {
  route?: object;
}
type updateRes = {};
type updateData = {};
const Profile: FC<Proptypes> = ({route}: Proptypes) => {
  const userData = useSelector((state: RootState) => state?.auth?.userData);
  const dispatch =useDispatch()
  const {mutate: onUpdateDetails, isPending} = usePostData<
    updateRes,
    Error,
    updateData
  >(UPDATE_USER_DATA, {
    onSuccess: async (data: any) => {
      console.log(data, 'datadata');
      setItem('userData', data?.data?.data);
      dispatch(setUserdata(data?.data?.data));
      showSuccess(data?.data?.message);
    },
    onError: async error => {
      showError(error);
    },
  });
  const [state, setState] = useState({
    phoneNumber: userData?.phonenumber,
    email: userData?.email,
    name: userData?.name,
  });
  const {phoneNumber, email, name} = state;
  const updateState = (data: any) => setState(state => ({...state, ...data}));

  return (
    <WrapperContainer>
      <Header isLeft={true} cetnerTitle={t('MY_PROFILE')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={imagePath.userImg}
            style={{
              width: moderateScale(100),
              height: moderateVerticalScale(100),
            }}
          />
        </View>
        <CustomTextInput
          placeholder="Enter Name.."
          value={name}
        />
        <CustomTextInput
          containerStyles={{marginTop: moderateVerticalScale(24)}}
          value={email}
        />
        <CustomTextInput
          containerStyles={{marginTop: moderateVerticalScale(24)}}
          editable={false}
          value={phoneNumber}
        />
        <GradientButton
          indicator={isPending}
          containerStyle={{marginBottom: moderateVerticalScale(12)}}
          btnText={t('UPDATE_USER_DETAILS')}
          onPress={() =>
            onUpdateDetails({
              id: userData?._id,
              name,
              email,
              phoneNumber
            })
          }
        />
      </ScrollView>
    </WrapperContainer>
  );
};

export default Profile;
