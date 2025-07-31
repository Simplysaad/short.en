const getRandomText = amount => {
    const charArr = [
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
        ...Array.from({ length: 10 }, (_, i) => String(i))
    ];

    const randomCombination = new Array()
    for(let i=0; i<amount; i++){
      let randomIndex = Math.floor(Math.random()*62)
      randomCombination.push(charArr[randomIndex])
    }
    
    let randomText = randomCombination.join("")
    return randomText
};
module.exports = getRandomText
