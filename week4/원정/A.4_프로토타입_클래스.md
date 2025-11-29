# A.4 프로토타입 클래스

3장에서는 프로토타입과 프로토타입 체인을 사용해 객체를 연결하는 방법에 대해 알아봤다.

이렇게 프로토타입 연결 장치를 사용하는 방법을 프로토타입 클래스라 부른다. ES6에서 우아하게 객체를 연결해주는 클래스 시스템이 등장하기 전까지 프로토타입 클래스는 객체를 연결하는 역할을 했다.

Object.create()를 사용한 예시를 다시 한번 살펴보자.
``` js
var Classroom = {
    welcome() {
        console.log("학생 여러분, 환영합니다.");
    }
};

var mathClass = Object.create(Classroom);
mathClass.welcome();
```

예시에서 객체 mathClass는 프로토타입을 통해 객체 Classroom과 연결된다. 두 객체가 연결되어 있기 때문에 함수 mathClass.welcome()을 호출하면 위임이 일어나면서 Classroom에 정의되어 있는 메서드가 호출된다.

프로토타입 클래스 패턴에서는 이런 방식의 위임을 상속이라고 부른다. 프로토타입을 사용한 상속은 다음과 같이 정의할 수도 있다.

``` js
function Classroom() {
    // ...
}

Classroom.prototype.welcome = function hello() {
    console.log("학생 여러분, 환영합니다.");
}

var mathClass = new Classroom();
mathClass.welcome();
// 학생 여러분, 환영합니다.
```

모든 함수는 기본적으로 prototype이라는 프로퍼티를 통해 빈 객체를 참조한다. 이름이 헷갈리긴 하지만 prototype 이름의 프로퍼티는 함수의 프로토타입과는 다르다. 프로퍼티인 prototype은 new를 사용해 함수를 호출해 객체를 만들었을 때, 새롭게 만든 객체의 프로토타입을 설정할 수 있도록 한다.

예시에서는 빈 객체(Classroom.prototype)에 welcome이라는 프로퍼티를 추가하고, welcome 프로퍼티가 hello()를 가리키도록 했다. 그리고 new Classroom()으로 새로운 객체를 만들어 이 객체의 프로토타입이 기존 객체인 Classroom.prototype이 되도록 했다.

mathClass에는 welcome()이라는 프로퍼티나 함수가 없지만, prototype 프로퍼티 덕분에 Classroom.prototype.welcome()에 성공적으로 위임되었다.

프로토타입 클래스 패턴보다는 ES6의 클래스 메커니즘을 쓰는 게 훨씬 낫다.