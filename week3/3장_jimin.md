# 3. 자바스크립트 뿌리 파헤치기

## 3.1 이터레이션(Iteration pattern)

💡 목적  
: `데이터 전체를 한 번에 처리하는 대신`, 데이터를 `일정 단위로 쪼개어` 이 조각들을 `차례대로(순회하며)` `점진적으로 처리`하는 아이디어에서 출발  
- 대용량 데이터나 크기를 알 수 없는 데이터 컬렉션을 처리할 때, `표준화된 방법`을 제공하여 반복 작업을 `범용적`이고 `효율적`으로 수행하도록 도움  
- 질의 결과가 수백, 수천 줄 이상이 될 때처럼, 데이터를 루프 등을 사용해 반복적으로 처리해야 할 필요성이 있을 때 사용  


💡 구성 요소 및 동작 방식  
: 이터레이터 패턴의 핵심은 데이터에 접근하고 처리하는 방법을 표준화하는 것  

- `이터레이터(Iterator)`: 처리할 데이터를 참조하는 `데이터 구조`  
- `next() 메서드`
    - 이터레이터가 지원하는 핵심 메서드
    - 이 메서드를 호출할 때마다 데이터의 **다음 조각(레코드, 줄 등)**이 차례대로 반환  
- `반복 작업 종료 신호`:
    - 데이터 조각의 개수를 사전에 알기 어려운 경우, 이터레이터는 데이터를 `전부 처리했을 때` 다음 작업이 없음을 알리는 `특별한 값`을 사용하거나 `예외를 발생`시켜 반복 작업이 종료되었음을 알림  

💡 자바스크립트에서의 이터레이터 프로토콜 (ES6)  
ES6 명세서에는 자바스크립트 내장 문법을 통해 이터레이터 패턴을 구현하기 위한 `구체적인 프로토콜(규약)`이 추가  

- `next() 메서드의 반환 값`
    - `next()`는 반드시 `이터레이터 결과 객체(iterator result)`를 반환
- `이터레이터 결과 객체의 프로퍼티`
    - `value`: 반환된 데이터의 실제 조각
    - `done`: 반복 작업의 완료 여부를 나타내는 `불리언 값`
        - 반복 작업이 끝나지 않은 경우: `done`은 false
        - 반복 작업이 종료된 경우: `done`은 true

➡️ 이터레이션 패턴은 `다양한 형태의 데이터 컬렉션`을 `동일하고 예측 가능한 방식`으로 순회하고 처리할 수 있게 해줌으로써, 코드를 `깔끔하고 이해하기 쉽게` 만들어 줌


### 3.1.1 이터레이터 소비하기  
: 이터레이션 프로토콜을 통해 얻은 `데이터 조각(이터레이터 결과 객체)`을 실제로 어떻게 활용하고 처리(소비)하는지


💡 기본  
ES6에서 정의한 이터레이션 프로토콜의 가장 기본적인 방식은 이터레이터 객체의 **`next()` 메서드를 직접 호출**하여 데이터를 순차적으로 처리

  - 반복 중단:  `next()` 호출의 반환값인 **이터레이터 결과 객체**에서 \*\*`done` 프로퍼티가 `true`\*\*로 확인되면 반복 작업이 중단
    ➡️ 이 방식을 직접 구현하려면 매번 `next()`를 호출하고, 반환된 객체를 확인하며, `done` 값을 체크하는 **번거로운 과정**이 필요
    
```javascript
// 1. 첫 번째 호출
console.log(iterator.next());
// -> { value: 1, done: false }  (순회 계속)

// 2. 두 번째 호출
console.log(iterator.next());
// -> { value: 2, done: false }  (순회 계속)

// 3. 세 번째 호출
console.log(iterator.next());
// -> { value: 3, done: false }  (순회 계속)

// 4. 마지막 호출 (데이터가 모두 소진됨)
console.log(iterator.next());
// -> { value: undefined, done: true } (순회 종료)
```


💡 표준화된 이터레이터 소비 방법

내부적으로 이터레이터 프로토콜을 준수하며, 개발자는 더 깔끔하고 간결하게 이터레이터를 소비할 수 있음 개꿀임  

💭 `for...of` 반복문  

```javascript 
// 처리하려는 데이터의 이터레이터
var it = /* ... */;

// iterator result 객체를 순회
for(let val of it) {
  console.log('이터레이터 값: ', val);
}
```
:  `for...of`는 이터레이터(`it`)가 `done: true`를 반환할 때까지 자동으로 `it.next()`를 반복 호출하고, 반환된 객체의 `value` 프로퍼티를 `val` 변수에 할당  

💭 전개 구문 (Spread Syntax: `...`)  
: 전개 구문은 이터레이터에서 데이터를 **추출해 펼치는 주체**, 즉 **이터레이터 소비자** 역할

| 표현식 | 역할 (대칭 형태) | 소비 역할 |
| :--- | :--- | :--- |
| **`...`** (전개 구문) | **값을 펼침** (이터러블을 배열이나 함수 인수로 확장) | **이터레이터 소비자** |
| `...` (나머지 매개변수) | **값을 모음** (여러 인수를 배열로 묶음) | 해당 없음 |

1. 배열에서 전개 구문 사용 (이터레이터를 배열의 요소로 펼치기  

```javascript
// 이터레이터를 펼친 결과가 배열의 각 요소가 되도록
var vals = [...it];
```
: 이터레이터 `it`에서 `next()`를 반복적으로 호출하여 얻은 **모든 `value` 값**을 추출하고, 그 값들을 새로운 배열 `vals`의 개별 요소로 펼쳐 넣음   

2. 함수 호출 시 전개 구문 사용 (이터레이터를 함수 인수로 펼치기)  

```javascript
// 이터레이터를 펼친 결과를 함수 호출문에 넘겨 각 값을 인수로 사용
doSomethingUseful(...it);
```
: 이터레이터 `it`에서 얻은 **모든 `value` 값**을 추출하여, 함수 `doSomethingUseful`을 호출할 때 **개별적인 인수**로 전달  


➡️ `for...of`와 전개 구문(`...`) 모두 내부적으로 **이터레이터 소비 프로토콜**을 준수  
이 문법들을 통해 이터레이터가 제공하는 값들을 추출하여 배열, 인수 목록 등 **원하는 구조에 간결하게 할당**할 수 있게 되며, 이것이 이터레이션 패턴의 범용성과 유용성을 높여줌  

### 3.1.2 이터러블
: 이터러블은 순회 가능한 값을 의미하며, 이터레이터 소비 프로토콜의 핵심 대상

- 이터레이터 소비 프로토콜은 이터러블을 사용해 이터레이터 인스턴스를 생성하고, 이 인스턴스를 소비하여 연산을 완료하는 기술
- 이터러블은 호출될 때마다 새로운 이터레이터 인스턴스를 생성할 수 있으므로, 하나의 이터러블을 여러 번 독립적으로 소비할 수 있음
-  ES6부터 문자열, 배열, Map, Set 같은 자바스크립트의 기본 자료구조 및 컬렉션은 모두 이터러블로 정의

```javascript
var arr = [10, 20, 30];

for (let val of arr) {
  console.log('배열의 값: ', val);
};
```

1. 배열
이터러블이기 때문에 전개 구문(...)로 이터레이터를 소비해 배열을 얕게 복사할 수 있음  
```javascript
var copiedArray = [...arr];
```

2. 문자열
역시 이터러블 따라서 전개구문으로 글자 하나하나를 순회할 수 있음 
```
var greeting = 'hello world';
var chars = [...greeting];

chars;
// ['h','e','l','l','o',' ','w','o','r','l','d'];
```

3. Map(키-값 자료구조)
기본 이터레이터를 지원함

Map의 내장 메서드 entries를 호출하면 맵의 값뿐만 아니라 키까지 포함한 2차원 배열인 entry 튜플 순회 가능  
```javascript
var buttonNames = new Map();
buttonNames.set(btn1, 'button 1');
buttonNames.set(btn2, 'button 2');

for(let [btn, btnName] of buttonNames) {
  btn.addEventListener('click', function onClick() {
      console.log('click!', btnName);
  });
}
```
for..of는 맵이 지원하는 기본 이터레이터를 순회하며 [btn, btnName] 문법(배열 구조 분해: array destructuring)을 사용해 튜플을 키, 값으로 분해  
그 결과 첫 번째 반복문이 돌 때는 btn에 btn1이, btnName에는 button 1이 할당  
```
🤔 만약 값만 추출하고 싶다면? values() 사용하세요  
```javascript
for(let btnName of buttonNames.values()) {
    console.log(btnName);
} // button 1, button 2
```
🤔 배열의 인덱스와 값을 대상으로 순회하고 싶다면? entries() 사용하세요  
```javascript
var arr = [10, 20, 30];

for(let [idx, val] of arr.entries()) {
    console.log(`${idx} : ${val}`);
}
// 0 : 10
// 1 : 20
// 2 : 30
```

기본 이터러블을 사용하지 않아도 이터레이션 프로토콜을 준수하는 자료구조를 직접 만든다면, 해당 자료구조에 ..., for...of 반복문을 적용할 수 있음  
이렇게 표준화된 이터레이션 프로토콜을 준수하면 전반적인 코드 가독성과 이해도가 올라감   


<br />

## 3.2 클로저
> 클로저는 함수가 정의될 때의 스코프 환경을 기억하고, 나중에 다른 스코프에서 실행될 때도 그 기억된 스코프의 변수에 접근할 수 있게 해주는 자바스크립트 함수의 타고난 특징
  
 <br/> 
 
- 함수가 정의된 외부 스코프의 변수를 에워싸서(close over), 해당 외부 스코프가 종료된 후에도 그 변수에 계속 접근할 수 있도록 보존하는 기능
- 클로저는 객체의 특징이 아니라 함수의 특징
- 클로저를 보려면, 함수를 정의된 스코프가 아닌 다른 스코프에서 실행 (일반적으로 함수를 반환하거나 콜백으로 전달할 때 발생)
  
```
function greeting(msg) {
    return function who(name) { // who()가 msg를 에워싼다 (클로저)
        console.log(`${name}, ${msg}`); 
    };
};

var hello = greeting('hello'); // 1. greeting 실행 종료
var howdy = greeting('how do you do'); // 2. greeting 실행 종료

hello('jimin'); // jimin, hello
howdy('jimin');  // jimin, how do you do
```
- 외부함수인 greeting()이 먼저 실행 내부함수인 who()의 인스턴스가 생성
- 내부함수인 who()는 greeting()이 있는 외부 스코프에서 넘어온 매개변수 msg를 에워쌈(close over)
- greeting()이 호출되면 내부함수 who()가 반환 ➡️ 이때 이 함수에 대한 참조가 외부 스코프에 있는 hello 변수에 할당

<br/>

- 두 번째 gretting이 호출되면 새로운 내부 함수 인스턴스가 생성
- 이 인스턴스 역시 매개변수로부터 넘겨받은 새로운 msg를 에워쌈
- 반환된 내부함수에 대한 참조는 howdy에 할당됨

 <br/>

여기서 대부분은 greeting() 실행 종료된 후 함수에서 사용했던 변수 전체가 가비지 컬렉션 대상이 되어 메모리에서 삭제될 것이라고 예상  
💭 그럼 예시에서 첫 번째와 두 번째 greeting()을 호출한 이후 msg가 사라지겠군  
🧑‍🏫 아님 이 변수들은 사라지지 않음 ➡️ 클로저 때문!  
who() 함수 인스턴스가 hello나 howdy에 할당되어 아직 살아있기 때문에, 이 인스턴스들은 자신이 에워싼 msg 변수('hello' 또는 'how do you do')를 메모리에서 삭제되지 않도록 보존  

<br/>

클로저는 변수의 **복사본(스냅샷)** 을 사용하는 것이 아니라, 변수 그 자체와 직접적인 관계를 맺음 (참조한다)  
이 때문에 변수가 업데이트되면 클로저를 통해 접근하는 값도 최신 값으로 반영
```
function counter(step = 1) {
    var count = 0; // count 변수는 클로저에 의해 보존되고, 업데이트
    return function increaseCount() {
        count = count + step;
        return count;
    };
}

var incBy1 = counter(1);
var incBy3 = counter(3);

incBy1(); // 1
incBy1(); // 2 (count 값이 초기화되지 않고 업데이트됨)

incBy3(); // 3
incBy3(); // 6
incBy3(); // 9
```
여기서 counter() 함수를 두 번 실행했으므로 내부 함수 increaseCount()의 인스턴스가 두 개 생김  
이 인스턴스 각각은 외부함수 counter()의 스코프에 있는 변수 counter와 step을 에워쌈  
➡️ incBy1과 incBy3는 각각 counter 함수 실행 시 만들어진 고유한 클로저 환경을 가지고 있음  

<br/>

그런데 incBy1()이나 incBy3()을 실행하면 step은 값이 변하지 않지만 count 내부함수가 실행될 때마다 값이 바뀜  
➡️ 클로저는 스냅샷한 값을 사용하지 않고(count 변수를 보존) 변수 그 자체와 직접적인 관계를 맺기 때문에 incBy1()이나 incBy3을 여러번 실행해도 업데이트된 count(이 보존된 count 변수를 직접 업데이트하기 때문) 값이 초기화되지 않음  

<br/>
  
클로저는 콜백과 같이 비동기 작업을 수행하는 코드에서 가장 흔하게 볼 수 있음  
```
function getSomeData(url) {
    ajax(url, function onResponse(resp) { // onResponse()가 url을 에워쌈
        console.log(`${url} response: ${resp}`);
    });
}

getSomeData('https://some.url/wherever'); // getSomeData()가 실행 종료되더라도 url 값은 콜백이 실행될 때까지 보존
```
내부함수 onResponse()는 url을 에워싸기 때문에 ajax 호출이 완료되고 그 결과가 onResponse() 콜백함수에 의해 처리될 때까지 url을 보존하고 기억함  
이때 getSomeData()가 곧바로 실행 종료되더라도 특별한 이유가 없다면 매개변수 url을 통해 받은 값은 클로저 안에 보존  

<br/>

외부 스코프가 항상 함수여야 하는 건 아니지만, 보통 내부 함수에서 하나 이상의 외부 스코프 변수에 접근하려 할 때 클로저를 관찰할 수 있음  
```
for(let [idx, btn] of buttons.entries()) { // let은 반복마다 새로운 idx를 만듦
    btn.addEventListener('click', function onClick() { // onClick()이 매번 새로운 idx를 에워쌈
        console.log(`click ${idx} button!`);
    });
}
```
여기선 let을 사용했기때문에 반복이 일어날 때마다 변수 idx, btn은 새로운 블록 스코프(지역 스코프)에서 정의됨  
또한 반복문이 실행될 때마다 새로운 내부 함수인 onClick()이 만들어지는데, 이 내부함수는 idx를 에워싸서 클릭 이벤트 핸들러가 btn에 할당된 동안 idx를 보존  
👍 덕분에 특정 버튼을 클릭 시 버튼에 할당된 핸들러가 인덱스를 기억하고 있다 버튼 순서에 맞는 인덱스 값을 출력함  

<br/>

## 3.3 this 키워드
클로저에서 확인한 바와 같이, 함수는 정의된 시점에 클로저를 통해 함수를 에워싸는 스코프에 부착됨   
이때 스코프는 변수가 어떤 것을 참조하는지를 결정하는 규칙 모음임  

  
함수는 스코프말고도 자신이 어디까지 접근 가능한지를 결정하는 함수만의 특징을 갖음  
이 특징은 실행 컨텍스트(execution context)개념으로 가장 잘 설명되며 함수는 this 키워드를 통해 실행 컨텍스트에 접근  

스코프는 `정적`이며 함수를 정의하는 순간, 해당 스코프에서 사용할 수 있는 한정된 변수 집합을 포함함  
반면 함수의 실행 컨텍스트는 `동적`임   
실행 컨텍스트는 함수를 정의한 위치나 함수를 호출하는 위치와 상관없이 `함수 호출 방식`에 따라 결정됨  

즉, this는 함수의 정의에 종속되어 결정되는 변치 않는 특성이 아니라, 함수를 호출할 때마다 결정되는 동적 특성임  
실행 컨텍스트는 함수가 실행되는 동안 함수에서 사용할 수 있는 프로퍼티를 가진 유형의 객체로 생각하면 이해가 쉬움   
> cf, 스코프
> 🤔 그럼 스코프도 객체가 아닌가?
> 스코프에서 객체는 js엔진 내부에 숨겨져 있고 함수 하나당 동일하며, 프로퍼티의 경우 함수 내부에서 사용할 수 있는 식별자(변수) 형태를 띤다는 점에서 차이를 가짐

```
function classroom(teacher) {
    return function study() {
        console.log(`${teacher}`said study ${this.topic}`);
    }
}
var assignment = classroom('jimin');
assignement(); // jimin said study undefined
```
assignment를 호출했을 때 아무런 실행 컨텍스트를 제공하지 않고 함수처럼 호출했기 때문  
구체적인 컨텍스트를 지정하지 않고 실행하면 기본 컨텍스트가 전역 객체(브라우저에선 window 객체)가 되기 때문에 topic이 없어서 undefined로 뜬 거  

```
var homework = {
    topic: 'JS',
    assignment : assignment
};

homework.assignment();
// jimin said study JS
```
assignment 함수의 참조 복사본을 homework 객체의 프로퍼티로 설정, homework.assignment() 호출  
이때는 this가 homework 객체 따라서 this.topic은 JS  

```
var otherHomework = {
    topic: '수학'
};
assignment.call(otherHomework);
// jimin said study 수학
```
this가 참조하는 객체를 결정하는 메서드 call()을 사용해 assignment 실행  
this.topic은 수학을 참조  

함수에서 this를 사용하면 컨텍스트를 동적으로 지정할 수 있고, 다른 객체에도 해당 함수를 재사용할 수 있어 매우 유연함  
스코프가 지정된 함수는 다른 스코프를 참조할 수 없고 변수를 직접 지정할 수도 없음  
하지만 this를 사용하면 동적으로 컨텍스트를 지정할 수 있으므로 특정 작업 환경에서 아주 유용함  



## 3.4 프로토타입 (Prototypes)

프로토타입은 **객체**의 특징이며, 구체적으로 **프로퍼티에 접근할 때 일어나는 동작**과 관련된 메커니즘

1. 프로토타입 연결 장치

  * **정의**: 프로토타입은 **두 객체를 연결하는 숨겨진 장치**, 이 장치는 객체가 생성될 때 만들어지며, 새로운 객체를 기존 객체에 연결
  * **프로토타입 체인**: 프로토타입을 통해 연결된 일련의 객체들을 \*\*프로토타입 체인(Prototype Chain)\*\*이라고 부름

2. 위임 (Delegation)의 역할

프로토타입 연결 장치가 존재하는 핵심 이유는 **위임**!

  * **동작**: 객체 B에서 프로퍼티나 메서드에 접근하려 할 때, B에 해당 프로퍼티가 없으면 연결된 객체 A로 **접근 권한을 위임**하여 처리할 수 있도록
  * **목적**: 위임을 통해 두 개 이상의 객체가 서로 협력하여 작업을 수행

 3. 기본 객체와 위임 예시

자바스크립트에서 객체 리터럴로 생성된 객체는 기본적으로 `Object.prototype` 객체에 연결

```javascript
var homework = {
    topic: "JS"
}
```

  * `homework` 객체는 오직 `topic` 프로퍼티만 가지고 있음
  * 하지만 내부적으로 **프로토타입 연결 장치**가 `homework`와 \*\*`Object.prototype`\*\*을 연결
  * 이 연결 덕분에 `homework` 객체는 `Object.prototype`에 정의된 **내장 메서드**(`toString()`, `valueOf()` 등)를 사용

**위임이 실제로 일어나는 예시:**

```javascript
homework.toString(); // [object Object]
```

1.  `homework`에서 `toString()`을 찾는다.
2.  `homework`에 `toString()`이 없다.
3.  프로토타입 연결 장치를 통해 연결된 \*\*`Object.prototype`\*\*으로 위임이 발생한다.
4.  `Object.prototype.toString()`이 호출되어 코드가 정상 작동한다.


### 3.4.1 객체 연결 장치

Point! \*\*`Object.create()`\*\*를 사용하여 객체 간의 \*\*프로토타입 연결(위임)\*\*을 직접 설정하는 방법과, \*\*접근(조회)\*\*과 \*\*할당(생성)\*\*이 프로토타입 체인에서 어떻게 다르게 동작하는지 이해하는 것

 1. Object.create()의 역할

`Object.create()`는 **새로운 객체**를 생성하는 메서드이며, 첫 번째 인수로 전달된 객체를 **새 객체의 프로토타입**으로 지정하여 둘을 연결

```javascript
var otherHomework = Object.create(homework);
```

  * `otherHomework`는 `homework`를 자신의 **프로토타입 연결 장치**로 삼아 연결
  * 이 연결 덕분에 `otherHomework`는 `homework`에 있는 프로퍼티(`topic: "JS"`)를 **위임받아 접근**할 수 있음

2. 접근(조회)과 할당(생성)의 동작 차이

프로토타입 체인은 \*\*프로퍼티에 접근(값을 읽으려 할 때)\*\*할 때만 동작하며, \*\*새로운 프로퍼티를 할당(값을 쓰려 할 때)\*\*할 때는 다르게 동작

| 동작 | 코드 | 발생 메커니즘 | 결과 |
| :--- | :--- | :--- | :--- |
| **접근/조회** | `otherHomework.topic` | `otherHomework`에 `topic`이 없어 연결된 `homework`로 **위임**하여 값을 찾음. | `"JS"`가 반환됨. |
| **할당/생성** | `otherHomework.topic = "수학"` | **위임이 발생하지 않고**, `otherHomework` **자체**에 새로운 `topic` 프로퍼티가 생성됨. | `homework.topic`은 **영향을 받지 않음** (`"JS"` 유지). |

이 할당 동작이 중요한 이유는, **프로토타입 체인은 읽기(위임)에는 사용되지만, 쓰기(할당) 시에는 기본적으로 그 객체에 프로퍼티를 직접 생성**하기 때문

3. 순수 독립 객체

`Object.create(null)`을 사용하면 **어떤 객체에도 연결되지 않은** (즉, `Object.prototype`에 연결되지 않아 `toString()` 같은 기본 메서드가 없는) **순수 독립 객체**를 만들 수 있음

  * 이 객체는 상속된 프로퍼티로 인해 발생할 수 있는 잠재적인 문제를 방지해야 할 때 (예: 해시 맵으로 사용할 때) 유용

4. 역사적 배경

ES6 `class` 문법이 도입되기 전, 자바스크립트 개발자들은 이 프로토타입 연결 장치(`Object.create()`)를 활용하여 **프로토타입 클래스**라는 패턴을 만들어 상속과 객체 지향을 구현함  


### 3.4.2`this`다시보기

1. `this`와 프로토타입의 관계

  * **`this`의 특징**: `this`는 함수가 **어떻게 호출되었는지**에 따라 동적으로 컨텍스트(객체)를 가져오는 특징
  * **프로토타입의 특징**: 프로토타입은 \*\*객체 간의 연결(위임 체인)\*\*을 설정하는 특징
  * **협력**: 이 둘이 결합할 때, `this`의 동적 결정 능력은 프로토타입 체인을 통해 **위임된 메서드가 의도한 객체를 컨텍스트로 사용**할 수 있도록 만듦

2. 동적 `this`가 위임을 가능하게 하는 원리
```javascript
var homework = {
    study() {
        console.log(`${ this.topic }을 공부하세요`); // **핵심: this를 사용**
    }
};
var jsHomework = Object.create(homework);
jsHomework.topic = "JS";
jsHomework.study(); 
```

1.  **위임 발생**: `jsHomework` 객체에는 `study()` 메서드가 없어, 프로토타입 연결 장치인 `homework`로 **메서드 호출이 위임**됨
2.  **`this` 결정**: `study()` 메서드는 실제로 `homework` 객체에 정의되어 있지만, 호출은 `jsHomework.study()` 방식으로 이루어짐
3.  **동적 컨텍스트**: JavaScript에서 `this`는 호출 시점의 객체(`jsHomework`)를 가리킴
4.  **결과**: `this.topic`은 \*\*`jsHomework.topic`\*\*인 `"JS"`를 참조

마찬가지로 `mathHomework.study()`를 호출하면 `this`는 \*\*`mathHomework`\*\*가 되어 `"수학"`을 출력

3. 다른 언어와의 차이점

  * **다른 언어**: 상당수의 다른 객체 지향 언어에서는 메서드가 **실제로 정의된 객체**(`homework`)가 `this`로 고정된다. 만약 JS도 그랬다면 `this.topic`은 항상 `homework.topic` (존재하지 않거나 `undefined`)이 되었을 것이고, 이 코드는 유용하지 않았을 것
  * **JavaScript**: `this`가 **동적으로 호출 컨텍스트**를 가리키기 때문에, 위임을 받은 `study()` 메서드는 호출 주체(`jsHomework`, `mathHomework`)의 데이터를 마치 자신의 것처럼 활용할 수 있게 됨

이 **동적인 `this` 결정**은 JavaScript의 **프로토타입을 통한 위임** 모델, 특히 **`class` 기반 상속** 패턴을 효과적으로 구현하는 데 있어 **가장 중요한 요소**!

     
