const dayStart = '07:30';
const dayEnd = '17:45';

function scheduleMeeting(startTime, durationMinutes) {
  const [hours, minutes] = startTime.split(':').map(Number);

  const meetingStart = new Date(0, 0, 0, hours, minutes);
  const meetingEnd = new Date(0, 0, 0, hours, minutes + durationMinutes);

  const [startH, startM] = dayStart.split(':').map(Number);
  const [endH, endM] = dayEnd.split(':').map(Number);
  
  const workStart = new Date(0, 0, 0, startH, startM);
  const workEnd = new Date(0, 0, 0, endH, endM);

  return meetingStart >= workStart && meetingEnd <= workEnd;  
};

console.log(scheduleMeeting('7:00', 15)); // false
console.log(scheduleMeeting('07:15', 30)); // false
console.log(scheduleMeeting('7:30', 30)); // true
console.log(scheduleMeeting('11:30', 60)); // true
console.log(scheduleMeeting('17:00', 45)); //  true
console.log(scheduleMeeting('17:30', 30)); // false
console.log(scheduleMeeting('18:00', 15)); // false