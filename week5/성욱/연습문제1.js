// 비교 연습하기
// scheduleMeeting()은 "hh:mm" 형태의 회의 시작 시간과 분 단위의 회의 지속 시간을 인수로 받습니다.
// 변수 dayStart와 dayEnd에는 근무 시작 시각과 근무 종료 시각이 할당됩니다.
// scheduleMeeting 함수는 회의가 근무 시간 내에 이뤄질 경우 true를, 그렇지 않다면 false를 반환해야 합니다.

/*
const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime, durationMinutes) {
	// ... 코드 작성 ...
}

scheduleMeeting("7:00", 15); // false
scheduleMeeting("07:15", 30); // false
scheduleMeeting("7:30", 30); // true
scheduleMeeting("11:30", 60); // true
scheduleMeeting("17:00", 45); // true
scheduleMeeting("17:30", 30); // false
*/

const dayStart = '07:30'
const dayEnd = '17:45'

function calculateMinuteOfDay(str) {
  const [hour, minute] = str.split(':').map(Number)

  return hour * 60 + minute
}

function scheduleMeeting(startTime, durationMinutes) {
  const dayStartMinute = calculateMinuteOfDay(dayStart)
  const dayEndMinute = calculateMinuteOfDay(dayEnd)

  const startTimeMinute = calculateMinuteOfDay(startTime)
  const endTimeMinute = (startTimeMinute + durationMinutes) % (24 * 60)

  return startTimeMinute >= dayStartMinute && endTimeMinute <= dayEndMinute
}

console.log(scheduleMeeting('7:00', 15))
console.log(scheduleMeeting('07:15', 30))
console.log(scheduleMeeting('7:30', 30))
console.log(scheduleMeeting('11:30', 60))
console.log(scheduleMeeting('17:00', 45))
console.log(scheduleMeeting('17:30', 30))
console.log(scheduleMeeting('18:00', 15))

// 모범 답안의 비교가 필요한가..?
// startTime에 대한 파싱(유효성 검사) 추가 필요