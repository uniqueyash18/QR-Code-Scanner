import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      marginVertical: verticalScale(16),
    },
    dotStyle: {
      height: moderateScale(6),
      width: moderateScale(6),
      borderRadius: moderateScale(4),
      marginRight: moderateScale(8),
    },
    flexView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: moderateScale(16),
    },
})