const Meeting = [
  {
    mId: "1",
    start: 1603384491272,
    end: 1603384491272,
    location: "Meeting room 4",
    employeeIds: [
      { eId: 1234, status: "Accepted" },
      { eId: 1235, status: "Accepted" },
    ],
    name: "My First meeting",
  },
  {
    mId: "2",
    start: 1603384491272,
    end: 1603384491272,
    location: "Toilet",
    employeeIds: [
      { eId: 1234, status: "Pending" },
      { eId: 1235, status: "Accepted" },
    ],
    name: "My Second meeting",
  },
  {
    mId: "3",
    start: 1603384491272,
    end: 1603384491272,
    location: "Pantry",
    employeeIds: [
      { eId: 1234, status: "Past" },
      { eId: 1235, status: "Accepted" },
    ],
    name: "My Third meeting",
  },
  {
    mId: "4",
    start: 1603384491272,
    end: 1603384491272,
    location: "Pantry",
    employeeIds: [
      { eId: 1236, status: "Past" },
      { eId: 1235, status: "Accepted" },
    ],
    name: "My Fourth meeting",
  },
];
export default Meeting;
