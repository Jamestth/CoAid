const Meeting = [
  {
    mId: "1",
    start: 1603384491272,
    end: 1603384491272,
    location: "Meeting Room 4",
    employeeIds: [
      { eId: 1234, status: "Accepted" },
      { eId: 1235, status: "Accepted" },
    ],
    name: "Board of Directors Meeting",
  },
  {
    mId: "2",
    start: 1603384491272,
    end: 1603384491272,
    location: "Meeting Room 1",
    employeeIds: [
      { eId: 1234, status: "Pending" },
      { eId: 1235, status: "Accepted" },
    ],
    name: "Project Azure  Meeting",
  },
  {
    mId: "3",
    start: 1603284988002,
    end: 1603284991271,
    location: "Meeting Room 2",
    employeeIds: [
      { eId: 1234, status: "Past" },
      { eId: 1235, status: "Accepted" },
    ],
    name: "Marketing Department Meeting",
  },
  {
    mId: "4",
    start: 1603384491272,
    end: 1603384491272,
    location: "Meeting Room 5",
    employeeIds: [
      { eId: 1236, status: "Past" },
      { eId: 1235, status: "Accepted" },
    ],
    name: "My Fourth meeting",
  },
];
export default Meeting;
