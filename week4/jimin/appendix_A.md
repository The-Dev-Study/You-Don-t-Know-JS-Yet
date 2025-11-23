# A.1 값 vs 참조

### 1\. 값 타입 (Values, 원시 타입)

**원시 타입**의 값들은 변수에 할당될 때 메모리의 **스택(Stack)** 영역에 **실제 값 자체**가 저장
  * **복사 방식:** 할당($`=`$)이나 함수 인수로 전달될 때 **값의 복사본**이 만들어져 전달
  * **독립성:** 복사본이 전달되므로, 한 변수나 함수 내부에서 값을 변경해도 **원본 변수에는 영향을 주지 않음**
  * **해당 타입:** $`number`, $`string`, $`boolean`, $`null`, $`undefined`, $`symbol`, $`bigint`.

#### 💡 예시:

```javascript
let x = 10;
let y = x; // x의 값 10을 복사하여 y에 할당
y = 20;    // y만 변경

console.log(x); // 10 (x는 변경되지 않음)
console.log(y); // 20
```

-----

### 2\. 참조 타입 (References, 객체 타입)

**객체 타입**의 값들은 변수에 할당될 때 메모리의 **힙(Heap)** 영역에 **실제 데이터**가 저장되고, 변수에는 그 데이터가 있는 \*\*메모리 주소(참조)\*\*만 스택에 저장
  * **복사 방식:** 할당($`=`$)이나 함수 인수로 전달될 때 \*\*데이터의 주소(참조)\*\*가 복사되어 전달됩니다. **데이터 자체**가 복사되는 것이 ㄴㄴ
  * **공유:** 여러 변수가 같은 주소를 가리키고 있다면, 한 변수를 통해 객체의 내용을 변경하면 **같은 주소를 참조하는 모든 변수에 영향**을 미침
  * **해당 타입:** $`object`$ (일반 객체), $`array`$ (배열), $`function`$.

#### 💡 예시:

```javascript
let a = {
  value: 10
};
let b = a; // a가 가진 "주소"를 복사하여 b에 할당 (같은 객체를 가리킴)
b.value = 20; // b를 통해 객체의 '내용'을 변경

console.log(a.value); // 20 (a와 b 모두 같은 객체를 참조하므로 변경됨)
console.log(b.value); // 20
```

-----

# A.2 다양한 형태의 함수

기본 함수 선언: 함수를 정의하는 가장 **전통적이고 일반적인** 방식입

```javascript
function greeting() {
  // ...
}
```

- 함수 선언은 **전체가 호이스팅**됨 즉, 해당 스코프의 어느 위치에서 선언되었든 스코프의 시작 부분에서 이미 정의된 것처럼 처리되므로, **선언되기 전에도 함수를 호출**할 수 있음
- 반드시 **이름이 필요**하며, 이 이름은 해당 스코프에서 함수를 참조하는 변수 역할을 함

🌟 익명 함수 표현식: 함수에 **이름이 없는** 방식(함수를 값으로 취급하여 변수에 할당하는 방식, 함수가 **코드의 실행 흐름에 따라** 해당 위치에서 정의)   

```javascript
const ex = function() {
  // ...
};
```
- **변수 $`greeting`$만 호이스팅**되고, 함수 본체는 실행 시점에 해당 라인에서 정의, 따라서 함수를 **선언 전에 호출하면 에러**가 발생
- 함수를 값으로 다루기 때문에, 콜백 함수나 클로저를 반환하는 함수를 만들 때 주로 사용  

🌟 이름 추론 (Name Inference)   
: **익명 함수 표현식**에 이름이 없을 때, 자바스크립트 엔진이 **할당된 변수의 이름**을 함수의 이름으로 '추론'하여 설정해주는 기능

```javascript
const myFunc = function() { /* ... */ }; 
// 엔진이 myFunc이라는 이름을 함수에 할당하여 디버깅 등을 돕습니다.
```

메서드 (Methods): 객체의 속성으로 할당된 함수**를 메서드라고 부릅니다.
- **축약형 메서드 (Shorthand Method):** ES6부터는 객체 리터럴 내에서 $`function`$ 키워드 없이 함수를 정의하는 축약 문법이 가능

```javascript
const myObject = {
  // 축약형 메서드
  logMessage() {
    console.log("메시지 출력");
  },
  
  // 일반 함수 표현식 메서드
  getData: function() {
    // ...
  }
};
```

화살표 함수 (Arrow Functions)
```javascript
const sum = (a, b) => {
  return a + b;
};

// 본문이 단일 표현식이면 중괄호와 return 생략 가능
const multiply = (a, b) => a * b;
```

# A.3 강제 조건부 비교
...

# A.4 프로토타입 클래스

\*\*"함수가 가진 `prototype` 프로퍼티"\*\*와 \*\*"객체의 진짜 부모(프로토타입)"\*\*는 다름

1.  **`Classroom.prototype` (함수의 프로퍼티):**

      * 이것은 `Classroom`이라는 함수의 \*\*"창고"\*\*나 **"대기실"** 같은 공간
      * *"나중에 `new Classroom()`으로 누군가 태어나면, 이 창고에 있는 기능들을 쓰게 해 줄게\!"* 라고 미리 정의해두는 곳
      * `welcome` 함수가 여기에 저장

2.  **`mathClass.[[Prototype]]` (객체의 실제 프로토타입 링크):**

      * `mathClass`가 실제로 가지고 있는 \*\*"부모를 가리키는 끈"\*\*
      * `new` 키워드가 실행될 때, 이 끈이 위의 \*\*"창고(Classroom.prototype)"\*\*와 연결


```javascript
// 1. 생성자 함수 정의 (Classroom)
function Classroom() {
    // 인스턴스별 초기화 내용
}
Classroom.prototype.welcome = function() {
    console.log("환영합니다!");
};

// 3. new를 사용해 객체 생성 및 연결
// mathClass라는 객체가 만들어지고, 
// mathClass의 [[Prototype]] 끈이 Classroom.prototype 창고와 연결됨
var mathClass = new Classroom();

// 4. 위임 (Delegation) 발생
mathClass.welcome(); 
// ① mathClass에는 welcome이 없음 -> 실패
// ② 프로토타입 끈을 타고 Classroom.prototype(창고)을 뒤짐 -> 발견!
// ③ 실행 -> "환영합니다!" 출력
```
방금 저 과정을 ES6 `class`로 바꾸면, **우리가 직접 연결 장치(prototype)를 만지작거릴 필요가 없음**


