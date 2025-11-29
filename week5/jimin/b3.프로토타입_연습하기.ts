function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max;
};

var reel = {
    symbols : ['♠️', '♥️', '♦️', '♣️', '😄', '⭐️', '🌙', '☀️'],

    spin() {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1); 
        }
        this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
    },
    
    display() {
        if(this.position == null) {
            this.position = randMax(this.symbols.length - 1);
        }
        return this.symbols[this.position];
    }
};

var slotMachine = {
    reels: [
        Object.create(reel),
        Object.create(reel),
        Object.create(reel),
    ],

    spin() {
        this.reels.forEach(function spinReel(reel) {
            reel.spin();
        });
    },
    
    display() { 
        var lines:string[] = [];
        const len = this.reels[0].symbols.length; 

        for(let linePos = -1; linePos <= 1; linePos++){
            let line:[] = this.reels.map(
                function getSymbol(reel){
                    const targetIndex = (reel.position + linePos + len) % len;
                    
                    return reel.symbols[targetIndex];
                }
            );
            lines.push(line.join(' | '));
        }

        return lines.join('\n');
    }
};

slotMachine.spin();
console.log(slotMachine.display()); 
console.log('-----------')
slotMachine.spin();
console.log(slotMachine.display());