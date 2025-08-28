import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SignIn from './Screen/User/SignIn';
import SignUp from './Screen/User/SignUp';
import SignUpVerification from './Screen/User/SignUpVerification';
import PersonalInformation from './Screen/User/PersonalInformation';
import Home from './Screen/User/Home.js';
import ProfileButton from './Screen/User/ProfileButton.js';
import AccountSettings from './Screen/User/AccountSettings.js';
import ProfileSettings from './Screen/User/ProfileSettings.js';
import ChangingEmail from './Screen/User/ChangingEmail.js';
import EmailVerification from './Screen/User/EmailVerification.js';
import ChangingPassword from './Screen/User/ChangingPassword.js';
import ResetPassword from './Screen/User/ResetPassword.js';
import PasswordResetVerification from './Screen/User/PasswordResetVerification.js';
import ChangePassword from './Screen/User/ChangePassword.js';
import GradeConverter from './Screen/User/GradeConverter.js';
import ECTSCalculator from './Screen/User/ECTSCalculator.js';
import VPDCalculator from './Screen/User/VPDCalculator.js';
import Appointment from './Screen/User/Appointment.js';
import Search from './Screen/User/Search.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WishList from './Screen/User/WishList.js';
import Result from './Screen/User/Result.js';
import Community from './Screen/User/Community.js';

//admin
import AdminRolesScreen from './Screen/Admin/AdminRolesScreen';
import BachelorList from './Screen/Admin/BachelorList';
import MastersList from './Screen/Admin/MastersList';
import AddAdmin from './Screen/Admin/AddAdmin';
import AddSeminar from './Screen/Admin/AddSeminar'
import RegisteredList from './Screen/Admin/RegisteredList'
import UniversityOverview from './Screen/Admin/UniversityOverview'
import Requirements from './Screen/Admin/Requirements'
import AboutUniversity from './Screen/Admin/AboutUniversity'
import AddOverView from './Screen/Admin/AddOverView'
import AddRequirement from './Screen/Admin/AddRequirement'
import AddAboutUniversity from './Screen/Admin/AddAboutUniversity'
import UpdateOVerView from './Screen/Admin/UpdateOVerView'
import UpdateRequirements from './Screen/Admin/UpdateRequirements'
import UpdateAboutUniversity from './Screen/Admin/UpdateAboutUniversity'
import Notification from './Screen/Admin/Notification';
import HomeScreen from './Screen/Admin/HomeScreen';
import CoustomSend from './Screen/Admin/CoustomSend.js';
import UniversityList from './Screen/Admin/UniversityList.js';
import ManageAccount from './Screen/Admin/ManageAccount.js';
import Seminars from './Screen/Admin/Seminars.js';
import { MenuScreen } from './components/MenuScreen.js';
import Loading from './components/loading.js';
import AdminNotification from './Screen/Admin/AdminNotification.js';
import ChangePasswordFinal from './Screen/User/ChangePassword.js';
import ViewProfile from './Screen/User/ViewProfile.js';
import LOMChecker from './Screen/User/LOM.js';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()


function DrawerRoutes() {
  return (

    <Drawer.Navigator
      drawerContent={(props) => <MenuScreen {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/* <Drawer.Screen name="loading" component={Loading} /> */}
      <Drawer.Screen name="SignIn" component={SignIn} />
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="BachelorList" component={BachelorList} />
      <Drawer.Screen name="MastersList" component={MastersList} />
      <Drawer.Screen name="Seminars" component={Seminars} />
      <Drawer.Screen name="stack" component={AppNavigator} />
      <Drawer.Screen name="UniversityList" component={UniversityList} />
      <Drawer.Screen name="CoustomSend" component={CoustomSend} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="ProfileButton" component={ProfileButton} />
      <Drawer.Screen name="ProfileSettings" component={ProfileSettings} />
      <Drawer.Screen name="AccountSettings" component={AccountSettings} />
      <Drawer.Screen name="ChangingEmail" component={ChangingEmail} />
      <Drawer.Screen name="EmailVerification" component={EmailVerification} />
      <Drawer.Screen name="ChangingPassword" component={ChangingPassword} />
      <Drawer.Screen name="ResetPassword" component={ResetPassword} />
      <Drawer.Screen name="PasswordResetVerification" component={PasswordResetVerification} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="GradeConverter" component={GradeConverter} />
      <Drawer.Screen name="ECTSCalculator" component={ECTSCalculator} />
      <Drawer.Screen name="VPDCalculator" component={VPDCalculator} />
      <Drawer.Screen name="Appointment" component={Appointment} />
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="WishList" component={WishList} />
      <Drawer.Screen name="ViewProfile" component={ViewProfile} />
      <Drawer.Screen name="LOM" component={LOMChecker} />
      <Drawer.Screen name="Result" component={Result} />
      <Drawer.Screen name="Community" component={Community} />
      <Drawer.Screen name="AdminRoles" component={AdminRolesScreen} />
      <Drawer.Screen name="AddAdmin" component={AddAdmin} />
      <Drawer.Screen name="AddSeminar" component={AddSeminar} />
      <Drawer.Screen name="RegisterList" component={RegisteredList} />
      <Drawer.Screen name="UniversityOverview" component={UniversityOverview} />
      <Drawer.Screen name="Requirements" component={Requirements} />
      <Drawer.Screen name="AboutUniversity" component={AboutUniversity} />
      <Drawer.Screen name="AddOverView" component={AddOverView} />
      <Drawer.Screen name="forgot" component={ChangePasswordFinal} />
      <Drawer.Screen name="AddRequirement" component={AddRequirement} />
      <Drawer.Screen name="AddAboutUniversity" component={AddAboutUniversity} />
      <Drawer.Screen name="UpdateOVerView" component={UpdateOVerView} />
      <Drawer.Screen name="UpdateRequirements" component={UpdateRequirements} />
      <Drawer.Screen name="UpdateAboutUniversity" component={UpdateAboutUniversity} />
      <Drawer.Screen name="ManageAccounts" component={ManageAccount} />
      <Drawer.Screen name="AdminNotification" component={AdminNotification} />

    </Drawer.Navigator>

  );
}

export default function AppNavigator() {

  return (

    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>


      <Stack.Screen name="drawer" component={DrawerRoutes} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpVerification" component={SignUpVerification} />
      <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProfileButton" component={ProfileButton} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="ChangingEmail" component={ChangingEmail} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="LOM" component={LOMChecker} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="ChangingPassword" component={ChangingPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PasswordResetVerification" component={PasswordResetVerification} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="GradeConverter" component={GradeConverter} />
      <Stack.Screen name="ECTSCalculator" component={ECTSCalculator} />
      <Stack.Screen name="VPDCalculator" component={VPDCalculator} />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AdminRoles" component={AdminRolesScreen} />
      <Stack.Screen name="BachelorList" component={BachelorList} />
      <Stack.Screen name="MastersList" component={MastersList} />
      <Stack.Screen name="AddAdmin" component={AddAdmin} />
      <Stack.Screen name="AddSeminar" component={AddSeminar} />
      <Stack.Screen name="RegisterList" component={RegisteredList} />
      <Stack.Screen name="UniversityOverview" component={UniversityOverview} />
      <Stack.Screen name="Requirements" component={Requirements} />
      <Stack.Screen name="AboutUniversity" component={AboutUniversity} />
      <Stack.Screen name="AddOverView" component={AddOverView} />
      <Stack.Screen name="AddRequirement" component={AddRequirement} />
      <Stack.Screen name="AddAboutUniversity" component={AddAboutUniversity} />
      <Stack.Screen name="UpdateOVerView" component={UpdateOVerView} />
      <Stack.Screen name="UpdateRequirements" component={UpdateRequirements} />
      <Stack.Screen name="UpdateAboutUniversity" component={UpdateAboutUniversity} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="UniversityList" component={UniversityList} />
      <Stack.Screen name="CoustomSend" component={CoustomSend} />
      <Stack.Screen name="Seminars" component={Seminars} />
      <Stack.Screen name="ManageAccounts" component={ManageAccount} />
      <Stack.Screen name="forgot" component={ChangePasswordFinal} />
      <Stack.Screen name="AdminNotification" component={AdminNotification} />
    </Stack.Navigator>


  );
}
