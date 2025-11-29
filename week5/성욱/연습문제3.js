// 프로토타입 연습하기

// 독립적으로 돌아가는 릴 세 개가 있는 슬롯머신을 정의해봅시다.
// 함수 spin()을 실행하면 세 릴이 돌고, display()를 실행하면 결과가 출력됩니다.
// 릴 하나의 동작은 reel 객체에 정의되어 있습니다.
// 그런데 우리가 만들 슬롯머신에는 여러 릴이 있으므로 각 릴은 reel을 상속받아야 합니다.
// 여기에 더해 릴에는 position 프로퍼티도 필요합니다.

// 일반적으로 슬롯머신의 릴은 결과에 해당하는 기호 하나(position)와 앞 기호(position - 1), 뒤 기호(positon + 1)를 함께 표시합니다.
// 우리도 display()를 실행하면 3 x 3 그리드의 총 9개의 기호가 출력되도록 해봅시다.

/*
function randMax(max) {
  return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
  symbols: ["♠", "♥", "♦", "♣", "★", "●", "◆", "◇"],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1)
    }
    this.position = (this.position + 1) % this.symbols.length
  },
  display() {
		if (this.position == null) {
			this.position = randMax(this.symbols.length - 1);
		}
    return this.symbols[this.position]
  }
}

var slotMachine	= {
	reels: [
		// ... 코드 작성 ...
		// 슬롯 머신에는 세 개의 릴이 필요
		// 힌트: Object.create()를 사용
	],
	spin() {
		this.reels.forEach(function(reel) {
			reel.spin()
		})
	},
	display() {
		// ... 코드 작성 ...
	}
}

slotMachine.spin();
slotMachine.display();
// ♠ | ♥ | ♦ 
// ♣ | ★ | ●
// ◆ | ◇ | ♠

slotMachine.spin();
slotMachine.display();
// ♥ | ♦ | ♣ 
// ★ | ● | ◆
// ◇ | ♠ | ♥

*/

function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max
}

var reel = {
  symbols: ['♠', '♥', '♦', '♣', '★', '●', '◆', '◇'],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1)
    }
    this.position = (this.position + 1) % this.symbols.length
  },
  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1)
    }
    return this.symbols[this.position]
  }
}

var slotMachine = {
  reels: [
    Object.create(reel),
    Object.create(reel),
    Object.create(reel),
    Object.create(reel),
    Object.create(reel),
    Object.create(reel),
    Object.create(reel),
    Object.create(reel),
    Object.create(reel)
  ],
  spin() {
    this.reels.forEach(function (reel) {
      reel.spin()
    })
  },
  display() {
    return this.reels
      .map((reel, index) => {
        if (index % 3 === 2) {
          return reel.display() + '\n'
        }
        return reel.display() + ' | '
      })
      .join('')
  }
}

slotMachine.spin()
console.log(slotMachine.display())

slotMachine.spin()
console.log(slotMachine.display())

// 이해가 안돼서 풀이가 모범답안과 틀린데 모범답안은 spin과 display가 다른 object를 가지고 있는게 아닌가?