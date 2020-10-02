const patientsData = [
  {
    name: "Micheal Thompson",
    id: 100367,
    diagnosis: "ACL-Left-Knee",
    date: "Jan 13 2020",
    dob: "12/02/1997",
    email: "miketyson@gmail.com",
    phone_number: "+2348089916615",
    address: "83 Mile Drive, Ikeja, Lagos, Nigeria",
    img: "my patient.jpeg",
    gender: "Male",
    age: "23",
    height: '5" 20"',
    allergies: [
      { name: "Tilorine", value: "High" },
      { name: "Penicillin", value: "High" },
    ],
    used_drugs: [
      {
        brandName: "Lyrica",
        genericName: "Pregabalin",
        strength: "250",
        form: "Tab",
      },
      {
        brandName: "Viagra",
        genericName: "Sildenafil",
        strength: "500",
        form: "Tab",
      },
    ],
  },
  {
    name: "Grace Cardi",
    id: 100368,
    diagnosis: "Hamstring",
    date: "Jan 19 2020",
  },
  {
    name: "Jackson Drogba",
    id: 100369,
    diagnosis: "Headache",
    date: "Jan 29 2020",
  },
  {
    name: "Quavo Justin",
    id: 100366,
    diagnosis: "Hamstring",
    date: "Jan 31 2020",
  },
]
export default patientsData
