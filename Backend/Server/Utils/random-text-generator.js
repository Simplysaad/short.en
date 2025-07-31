const getRandomText = (amount = 6) => {
  const charArr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  const randomCombination = new Array();
  for (let i = 0; i < amount; i++) {
    let randomIndex = Math.floor(Math.random() * 62);
    randomCombination.push(charArr[randomIndex]);
  }

  let randomText = randomCombination.join("");
  return randomText;
};
// console.log(getRandomText(40))
export default getRandomText;
