// 클로저 연습하기

// range()는 두 개의 숫자 인자를 받으며, 두 숫자는 각각 원하는 범위의 시작과 끝을 나타냅니다.
// 두 번째 인자가 없는 경우에는 두 번째 인자를 넘길 수 있도록 하는 함수가 반환되어야 합니다.

/*
function range(start, end) {
	// ... 코드 작성 ...
}

range(3, 3); // [3]
range(3, 8); // [3, 4, 5, 6, 7, 8]
range(3, 0); // []

var start3 = range(3);
var start4 = range(4);

start3(3); // [3]
start3(8); // [3, 4, 5, 6, 7, 8]
start3(0); // []

start4(6); // [4, 5, 6]
*/

function range(start, end) {
  function makeRange(rangeEnd) {
    const arr = []
    for (let i = start; i <= rangeEnd; i++) {
      arr.push(i)
    }
    return arr
  }

  if (typeof end === 'undefined') {
    return makeRange
  }

  return makeRange(end)
}

var start3 = range(3)
var start4 = range(4)

console.log(start3(3)) // [3]
console.log(start3(8)) // [3, 4, 5, 6, 7, 8]
console.log(start3(0)) // []
console.log(start4(6)) // [4, 5, 6]

// 거의 동일