export const HOSPITALS_MOCK = {
  searchContext: {
    symptomId: 101,
    center: {
      lat: 37.556,
      lng: 126.923,
    },
  },
  hospitals: [
    {
      hospitalId: 5001,
      name: "닥터정형외과의원",
      category: "정형외과",
      address: "서울 마포구 양화로 123",
      distanceMeters: 350,
      coordinate: {
        lat: 37.557,
        lng: 126.924,
      },
      homepageUrl: "https://hospital.example.com",
    },
    {
      hospitalId: 5002,
      name: "마포내과의원",
      category: "내과",
      address: "서울 마포구 독막로 45",
      distanceMeters: 420,
      coordinate: {
        lat: 37.56,
        lng: 126.92,
      },
      homepageUrl: null,
    },
    {
      hospitalId: 5003,
      name: "홍대신경외과",
      category: "신경외과",
      address: "서울 마포구 홍익로 78",
      distanceMeters: 610,
      coordinate: {
        lat: 37.553,
        lng: 126.927,
      },
      homepageUrl: "https://hongdae-neuro.example.com",
    },
  ],
};
