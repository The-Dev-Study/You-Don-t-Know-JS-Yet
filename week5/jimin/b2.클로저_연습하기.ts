function getArray(s: number, e: number) {
    const result: number[] = [];
    for (let i = s; i <= e; i++) {
      result.push(i);
    }
    
    return result;
  };
  

function range(start: number): (end: number) => number[];
function range(start: number, end: number): number[];

// 두번째 인자가 없다면 두 번째 인자를 넘길 수 있도록 하는 함수 반환
function range(start: number, end?: number) {
  if (end === undefined) {
    return function getEnd(nextEnd: number) {
      return getArray(start, nextEnd);
    };
  }

  return getArray(start, end);
}

console.log(range(3, 3)); // [3]
console.log(range(3, 8)); // [3, 4, 5, 6, 7, 8]
console.log(range(3, 0)); // []

var start3 = range(3);
var start4 = range(4);

console.log(start3(3)); // [3]
console.log(start3(8)); // [3, 4, 5, 6, 7, 8]
console.log(start4(0)); // []

console.log(start4(6)); // [4, 5, 6]