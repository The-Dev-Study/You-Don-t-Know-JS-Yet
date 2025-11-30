/**
 *
 * @param start 범위의 시작
 * @param end 범위의 끝
 */

function range(start: number, end: number): number[];
function range(start: number): (end: number) => number[];

function range(start: number, end?: number) {
    // ...여기에 코드를 작성하세요...

    if (end !== undefined) {
        const res = [];

        for (let s = start; s <= end; s++) {
            res.push(s);
        }

        return res;
    }

    return function (newEnd: number) {
        const res = [];

        for (let s = start; s <= newEnd; s++) {
            res.push(s);
        }

        return res;
    };
}

console.log(range(3, 3)); // [3]
console.log(range(3, 8)); // [3, 4, 5, 6, 7, 8]
console.log(range(3, 0)); // []

var start3 = range(3);
var start4 = range(4);

console.log(start3(3)); // [3]
console.log(start3(8)); // [3, 4, 5, 6, 7, 8]
console.log(start3(0)); // []

console.log(start4(6)); // [4, 5, 6]
