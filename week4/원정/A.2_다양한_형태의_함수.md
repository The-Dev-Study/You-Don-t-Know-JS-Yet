# A.2 다양한 형태의 함수

2.4절 함수에서 봤던 코드를 다시 떠올려보자
``` js
var awesomeFunction = function(coolThings) {
    // ...
    return amazingStuff;
}
```

function 키워드와 매개변수가 들어갈 괄호 사이에 함수 이름을 나타내는 식별자가 없으므로 여기서 쓰인 함수 표현식은 익명 함수 표현식이 된다. JS는 익명 함수이더라도 다음과 같이 자체적으로 이름을 추론하기 떄문이다.

``` js
awesomeFunction.name;
// awesomeFunction
```
함수명을 직접 명시했을 때 함수의 name 프로퍼티에 접근하면 지정한 이름을 볼 수 있다. 익명함수 표현식에서도 name 프로퍼티에 접근하면 추론된 이름이 나타난다.

이렇듯 익명 함수 표현식이라도 할지라도 이름이 있을 수 있다. 다만 JS의 이름 추론은 할당 연산자를 사용해 함수 표현식을 할당한 것 같은 제한적인 상황에서만 발생한다. 함수 표현식을 인수로 전달하며 함수를 호출하는 경우에는 이름 추론이 발생하지 않는다.

추론을 통해 이름을 부여받긴 해도 익명 함수는 여전히 익명함수다. 추론된 이름은 문자열 형태의 메타데이터일 뿐, 해당 함수를 참조하는 유효한 식별자가 아니기 때문이다. 익명함수는 본문 안에서 자기 자신을 참조할 수 있는 식별자를 갖지 못한다. 이런 특징은 재귀를 사용하거나 등록된 이벤트를 해제할 때 문제가 된다.

앞서 살펴본 익명 함수 표현식과 다음 예시를 비교해보자
``` js
// let awesomeFunction = ...
// const awesomeFunction = ...

var awesomeFunction = function someName(coolThings) {
    // ...
    return amazingStuff;
}

awesomeFunction.name;
// someName
```

이렇게 코드를 작성하면 컴파일 중에 식별자 someName과 함수 표현식에 직접적인 연관 관계가 생긴다. 즉, 이 함수 표현식은 기명 함수 표현식이 된다. 다만 식별자 awesomeFunction과의 연관관계는 해당 구문이 실행될 때(런타임)까지는 발생하지 않는다.

기명 함수 표현시을 다룰 때 알아둬야 할 점이 하나 더 있다. 직접 지정한 이름은 name 프로퍼티를 사용해 지정한 이름보다 우선순위가 높다.

그렇다면 우리는 기명 함수 표현식을 사용해야 하는 걸까? 아니면 익명 함수 표현식을 사용해야 하는 걸까? 익명함수 표현식이 더 짧기 때문에 일반적이다.

유감스럽게도 여러분이 배워야 할 JS 함수 선언은 아주 많다. 
함수 선언 방식 중 일부를 잠깐 살펴보자
``` js
function *two() {...}

async function three() {...}

async function *four() {...}

export function five() {...}
```

함수 표현식 방식 역시 아주 다양한데, 일부만 소개하면 다음과 같다
``` js
// IIFE (즉시 실행 함수 표현식)
(function() {..})();
(function namedIIFE() {...})();

// 비동기 IIFE
(async function() { ... })();
(async function namedAIIFE() { ... })();

// 화살표 함수 표현식
var f;

f = () => 42;
f = x => x * 2;
f = (x) => x * 2;
f = (x, y) => x * y;
f = x => ({ x: x * 2});
f = x => { return x * 2; };
f = async x => {
    var y = await doSomethingAsync(x);
    return y * 2;
};
someOperation( x => x * 2 );
```

화살표 함수 표현식을 다룰 때는 함수 식별자가 될 이름을 직정 지정할 방법이 없으므로 화살표 함수 표현식은 문법적으로 익명이 될 수밖에 없다는 점을 유념해야 한다. 이름 추론이 작동하면서 이름이 부여되는 경우가 있긴 하지만 할당 연산자를 사용한 방식에서만 유효할 뿐, 코드의 마지막 줄 함수처럼 인수로 화살표 함수를 넘기는 방식에서는 이름이 부여되지 않는다.

화살표 함수는 사실 특별한 목적(this 키워드가 참조하는 렉시컬 환경을 핸들링하기 등)을 가지고 있는 함수이다. 그렇다고 해서 목적에 부합하는 모든 경우에 화살표 함수를 사용해야 한다는 말은 아니다.

클래스나 객체 리터럴을 정의할 때도 함수를 정의할 수 있다. 이런 형태의 함수는 특별히 메서드라고 부르며 JS에서 함수와 메서드 사이에 큰 차이는 없다.

``` js
class SomethingKindaGreat {
    // 클래스 메서드
    coolMethod() { ... }
    boringMethod() { ... }
}

var EntirelyDifferent = {
    // 객체 메서드
    coolMethod() { ... },
    boringMethod() { ... },

    // 익명 함수 표현식의 프로퍼티
    oldSchool: function() { ... }
}
```