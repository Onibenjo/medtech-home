export default {
  about: "/about",
  contact: "/contact",
  login: "/login",
  register: "/register",
  registerAs: "/register-as",
  products: "/",
  // products: "/our-product",
  // app routes
  dashboard: "/app",
  medicalInfo: "/app/medical-info",
  myPlan: "/app/my-plan",
  myRecord: "/app/my-record",
  myWallet: "/app/my-wallet",
  healthbank: "/app/nearest-healthbank",
  personalDetails: "/app/personal-details",
  userProfile: "/app/account-setting/profile",
  recommendation: "/app/recommendation",
  seeDoctor: "/app/see-doctor",
  smartmot: "/app/smart-mot",
  scheduleAppt: "/app/schedule-appointment",
  profile: "/app/account-setting/profile",
  userSupport: "/app/support",
  patientRoom: "/app/room2",
  // doctor route
  doctor: "/doctors",
  doctorRoom: "/doctors/room2",
  doctorDashboard2: "/doctors/dashboard",
  doctorDashboard: "/doctors",
  patients: "/doctors/my-patients",
  doctorAppt: "/doctors/appointments",
  healthtracker: "/doctors/patient-health-tracker",
  docProfile: "/doctors/account-setting/profile",
  docBankAccount: "/doctors/account-setting/bank-details",
  docReviews: "/doctors/account-setting/reviews",
  docWallet: "/doctors/my-wallet",
  docUpload: "/doctors/patient-upload",
  vitalRecord: "/doctors/vital-record",
  vitalSigns: "/doctors/vital-signs",
  docSupport: "/doctors/support",
  // doctor route
  clinic: "/clinic",
  clinicRoom: "/clinic/room2",
  clinicDashboard: "/clinic/dashboard",
  clinicPatients: "/clinic/my-patients",
  clinicAppt: "/clinic/appointments",
  clinicProfile: "/clinic/account-setting/profile",
  clinicBankAccount: "/clinic/account-setting/bank-details",
  clinicReviews: "/clinic/account-setting/reviews",
  clinicWallet: "/clinic/my-wallet",
  clinicUpload: "/clinic/patient-upload",
  clinicSupport: "/clinic/support",
  // patient route
  // patient(patient: { id: string }) {
  patient({ id }) {
    return {
      href: "patient/[id]",
      as: `patient/${id}`,
    }
  },
}

export const routes = {
  "/doctors": "Dashboard",
  "/doctors/room2": "Room",
  "/doctors/dashboard": "Dashboard",
  "/doctors/my-patients": "My Patients",
  "/doctors/appointments": "Appointments",
  "/doctors/patient-health-tracker": "Dashboard",
  "/doctors/account-setting/profile": "Profile",
  "/doctors/account-setting/bank-details": "Bank Details",
  "/doctors/account-setting/reviews": "Reviews",
  "/doctors/my-wallet": "My Wallet",
  "/doctors/patient-upload": "Patient Upload",
  "/doctors/vital-record": "Vital records",
  "/doctors/vital-signs": "Vital Signs",
  "/doctors/support": "Tech Support Contact",

  "/app": "Dashboard",
  "/app/medical-info": "Medical Info",
  "/app/my-plan": "My Plan",
  "/app/my-record": "My Record",
  "/app/my-wallet": "My Wallet",
  "/app/nearest-healthbank": "Healthbank",
  "/app/personal-details": "Profile",
  "/app/account-setting/profile": "Profile",
  "/app/recommendation": "Recommendation",
  "/app/see-doctor": "See A Doctor",
  "/app/smart-mot": "Dashboard",
  "/app/schedule-appointment": "Schedule Appointment",
  "/app/support": "Support",
  "/app/room2": "Room",
}
