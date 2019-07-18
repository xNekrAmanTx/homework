{
    function randomInt(max, min = 0) {
        return (min + Math.random() * (max - min + 1)) | 0
    }

    let arena = [];

    function makeGladiators(X) {
        for (let i = 0, glad; i < X; i++) {
            glad = {};

            glad.initialHealth = glad.Health = randomInt(100, 80);
            glad.Power = randomInt(5, 2) + Math.random().toFixed(1);
            glad.initialSpeed = glad.Speed = randomInt(5, 1) + Math.random().toFixed(3)
            glad.Name = faker.name.findName();

            arena.push(glad);
        }
    }

    function calculateSpeed(war){
        war.Speed *= war.initialSpeed * (war.Health / war.initialHealth)
    }

    function getFurious(war) {
        war.Speed *= 3;
    }

    let ind = w => arena.indexOf(w);

    function attack(glad, opp) {
        opp = arena.slice().splice(ind(glad),1)[randomInt(arena.lenth - 2)];
        opp.Health -= glad.Power;
        calculateSpeed(opp);

        console.log(`[${glad.Name} x ${glad.Health}] hits [${opp.Name} x ${opp.Health}] with power ${glad.Power}`)
    }

    function healUp(dead) {
        dead.Health = 50;
    }

    function die(dead) {
        arena.splice(ind(dead), 1);
        console.log(`[${dead.Name}] dying`)
    }

    const decide = bool => {
        return new Promise((res, rej) => {
            bool ? res() : rej();
        })
    }

    function decideCeasar(dead) {
        stop();
        decide(+prompt('Let him alive or Finish him?', 1))
            .then(dead => {
                healUp(dead);
                console.log(`Caesar showed :+1: to [${dead.Name}]`);
            })
            .catch(dead => {
                die(dead);
                console.log(`Caesar showed :-1: to [${dead.Name}]`);
            })
    }


    makeGladiators(+prompt('Ave, Ceasar, how many Gladiators do you need into the Arena?', 3));

    let timer, timerik, man;

    function start() {
        for (let warrior of arena) {
            timerik = setInterval(() => {
                attack(warrior);

            }, 6 - warrior.Speed)
        }
        timer = setInterval(() => {
            if(arena.length > 1) {
                for (let guy of arena) {
                    if(guy.Health >= 15 && guy.Health <= 30) getFurious(guy);
                    else if(guy.Health <= 0) decideCeasar(guy);
                }
            } else console.log(`[${(man = arena[0]).Name}] won the battle with health x ${man.Health}`);
        }, 1000)
    }

    function stop() {
        clearInterval(timer);
        clearInterval(timerik);
    }
    // console.log(arena)

    start()

    // not ended yet, there are a lot of problems here (with Promise and timerik), I could avoid problem with timerik
    // making everithink using Classes, but it is already another story........
}