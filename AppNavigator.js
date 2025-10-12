import { createStackNavigator } from '@react-navigation/stack';


import SignIn from './Screen/User/SignIn.js';
import SignUp from './Screen/User/SignUp.js';
import Home from './Screen/User/Home.js';
import ProfileSettings from './Screen/User/EditProfile.js';
import GradeConverter from './Screen/User/GradeConverter.js';
import ECTSCalculator from './Screen/User/ECTSCalculator.js';
import VPDCalculator from './Screen/User/VPDCalculator.js';
import Appointment from './Screen/User/Appointment.js';
import Search from './Screen/User/Search.js';
import WishList from './Screen/User/WishList.js';
import Result from './Screen/User/Result.js';
import Community from './Screen/User/Community.js';
import ChangePasswordFinal from './Screen/User/ForgotPassword.js';
import ViewProfile from './Screen/User/ViewProfile.js';
import LOMChecker from './Screen/User/LOM.js';

//admin
import AdminRolesScreen from './Screen/Admin/RolesScreen.js';
import BachelorList from './Screen/Admin/BachelorList.js';
import MastersList from './Screen/Admin/MastersList.js';
import AddSeminar from './Screen/Admin/AddWebinar.js'
import UpdateWebinar from './Screen/Admin/UpdateWebinar.js';
import RegisteredList from './Screen/Admin/RegisteredList.js'
import UniversityDetails from './Screen/Admin/UniversityDetails.js'
import AddUniDetails from './Screen/Admin/AddUniDetails.js'
import UpdateUniDetails from './Screen/Admin/UpdateUniDetails.js'
import Notification from './Screen/User/Notification.js';
import HomeScreen from './Screen/Admin/HomeScreen.js';
import CoustomSend from './Screen/Admin/SendNotification.js';
import UniversityList from './Screen/Admin/UniversityList.js';
import ManageAccount from './Screen/Admin/ManageAccount.js';
import Seminars from './Screen/Admin/Webinars.js';
import Loading from './components/loading.js';
import AdminNotification from './Screen/Admin/AdminNotification.js';
import PHDList from './Screen/Admin/phdList.js';


const Stack = createStackNavigator();


export default function AppNavigator() {

  return (

    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="loading" component={Loading} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="LOM" component={LOMChecker} />
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
      <Stack.Screen name="phdList" component={PHDList} />
      <Stack.Screen name="AddSeminar" component={AddSeminar} />
      <Stack.Screen name="EditSeminar" component={UpdateWebinar} />
      <Stack.Screen name="RegisterList" component={RegisteredList} />
      <Stack.Screen name="UniversityOverview" component={UniversityDetails} />
      <Stack.Screen name="AddOverView" component={AddUniDetails} />
      <Stack.Screen name="UpdateOVerView" component={UpdateUniDetails} />
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