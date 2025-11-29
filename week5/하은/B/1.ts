const dayStart = '07:30';
const dayEnd = '17:45';

/**
 *
 * @param startTime : 회의 시작 시각 (hh:mm)
 * @param durationMinutes : 분 단위의 회의 지속 시간
 * return:회의가 근무 시간 내에 이루어 지는가? boolean
 */
function scheduleMeeting(startTime: string, durationMinutes: number): boolean {
    const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const meetingStartTime = timeToMinutes(startTime);
    const dayStartTime = timeToMinutes(dayStart);
    const dayEndTime = timeToMinutes(dayEnd);

    const meetingEndTime = meetingStartTime + durationMinutes;

    return meetingStartTime >= dayStartTime && meetingEndTime <= dayEndTime;
}

console.log(scheduleMeeting('7:00', 15)); // false
console.log(scheduleMeeting('07:15', 30)); // false
console.log(scheduleMeeting('7:30', 30)); // true
console.log(scheduleMeeting('11:30', 60)); // true
console.log(scheduleMeeting('17:00', 45)); // true
console.log(scheduleMeeting('17:30', 30)); // false
console.log(scheduleMeeting('18:00', 15)); // false
