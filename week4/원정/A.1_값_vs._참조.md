# A.1 값 vs. 참조
2장에서 두 가지 주요 타입인 원시 타입과 객체에 대해 알아봤다. 하지만 값을 할당하고 전달할 때, 원시 타입과 객체가 어떻게 다른지는 이야기하지 않았다.

값을 할당하거나 전달할 때 직접 값 그 자체를 할당, 전달할지 아니면 값의 참조를 할당, 전달할지 개발자가 선택할 수 있도록하는 프로그래밍 언어가 많다. 그런데 JS에서는 이 과정이 오로지 값의 타입으로 결정된다.

JS에서는 원시 타입 값을 할당, 전달할 때 값이 복사되어 할당, 전달된다. 예시를 살펴보자.

``` js
var myName = "카일";
var yourName = myName;
```

예시에서 변수 yourName에는 변수 myName에 할당된 값인 "카일"을 복사한 독립된 문자열이 저장된다. 값이 원시 타입이므로 값 할당, 전달 시 이와 같이 값이 복사된다.

yourName과 myName의 값이 독립적이라는 것은 아래 예시를 통해 증명할 수 있다.

``` js
var myName = "카일";
var yourName = myName;

myName = "보라";

console.log(myName);
// 보라

console.log(yourName);
// 카일
```

두 변수에는 독립적으로 복사된 값이 저장되므로 변수 myName에 새로운 값인 "보라"를 할당하더라도 yourName이 영향을 받지 않는다.

이와 대조적으로 참조는 두 개 혹은 그 이상의 변수가 하나의 값을 가리키므로 공유하는 값을 수정하면 이 값을 참조하는 모든 변수가 영향을 받는다. JS에서는 객체값만 참조로 처리된다.
예시를 살펴보자

``` js
var myAddress = {
    street: "종로구 청와대로 1",
    city: "서울특별시",
    country: "대한민국"
};

var yourAddress = myAddress;

myAddress.street = "서울특별시 영등포구 의사당대로 1";

console.log(yourAddress.street);
// 서울특별시 영등포구 의사당대로 1
```

변수 myAddress에 객체를 할당했으므로 myAddress에는 객체가 아닌 객체의 참조가 저장, 할당된다. 그렇기 때문에 yourAddress에도 myAddress에 할당한 객체가 아닌 myAddress에 할당된 참조의 복사가 할당된다. 따라서 yourAddress.street에 접근하면 myAddress.street를 통해 갱신한 값이 출력된다.

다시 한번 정리하자만 JS에서는 값을 복사할지 참조를 복사할지가 값의 타입에 따라 결정된다. 원싯값은 값 그 자체를 저장, 할당하고, 객체는 참조를 저장, 할당한다. 