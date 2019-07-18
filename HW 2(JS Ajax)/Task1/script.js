{
    let timer1, timer2, timer3;

    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            timer1 = setInterval(() => { this.age++ }, 1000);
            if (this.age > 39) clearInterval(timer1); // doesn't work... why?
        }
    }

    const Leon = new Person('Leo', 15);
    const Shelly = new Person('Shell', 20);
    const Piper = new Person('Pipe', 34);
    const Mike = new Person('Miki', 13);

    let alives = [Leon, Shelly, Piper, Mike];
    
    function checkAgeAndRemove() {
        timer2 = setInterval(()=>{alives = alives.filter(el => el.age < 40)}, 2000);
        // setTimeout(clearInterval(timer), 60000);
    }

    checkAgeAndRemove();

    function randomInt (max, min = 0) {
        return (min + Math.random()*(max - min + 1)) | 0
    }

    function createRandom() {
        timer3 = setInterval(() => {
            let name = Array(randomInt(7,3)).fill`a`.map((_,i) =>
                String.fromCharCode(randomInt.apply(null, i ? [122,97] : [90,65]))).join``; // Node.js - um, karcem, shat parz lucum ka - Buffer...
            let age = randomInt(39);
            alives.push(new Person(name,age));
            console.log(alives);
        }, 2000)
    }

    createRandom()

    setTimeout(()=>{console.log(Piper)}, 9000)


}