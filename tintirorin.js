var coin = 1000;

window.addEventListener("load", function () {

  var dices = ["./image/sai01.jpg", "./image/sai02.jpg", "./image/sai03.jpg",
               "./image/sai04.jpg", "./image/sai05.jpg", "./image/sai06.jpg", "./image/white.png"];

  function changeDice(id, number) {
    $("#" + id).attr("src", dices[number - 1]);
  };
 
  var start = document.getElementById("start");

  start.addEventListener("click", function () {

    var betCoin = document.getElementById("betCoin").value;
    var howManyTimes = document.getElementById("howManyTimes");
    var enemyHowManyTimes = document.getElementById("enemyHowManyTimes");
    var again = document.getElementById("again");
    var isWon = document.getElementById("isWon");
    var errorLog = document.getElementById("errorLog");
    var myPipsResultFirst = document.getElementById("myPipsResultFirst");
    var myPipsResultSecond = document.getElementById("myPipsResultSecond");
    var myPipsResultThird = document.getElementById("myPipsResultThird");
    var enemyPipsResultFirst = document.getElementById("enemyPipsResultFirst");
    var enemyPipsResultSecond = document.getElementById("enemyPipsResultSecond");
    var enemyPipsResultThird = document.getElementById("enemyPipsResultThird");
    var shakeAgain = document.getElementById("shakeAgain");
    var displayGap = document.getElementById("displayGap");
    var displayMyHand = document.getElementById("displayMyHand");
    var displayEnemyhand = document.getElementById("displayEnemyHand");

    betCoin = parseInt(betCoin);

    if (coin <= 0 || coin >= 50000000000000000) {
      if (coin <= 0) {
        document.getElementById("gameOver").style.display = "block";
      } else {
        document.getElementById("clear").style.display = "block";
      }
    } else if (coin - betCoin < 0) {
      errorLog.innerHTML = "金額が不足しています。";
    } else if (isNaN(betCoin) || betCoin <= 0) {
      errorLog.innerHTML = "正しい数値を入力してください。";
    } else {
      howManyTimes.innerHTML = "";
      enemyHowManyTimes.innerHTML = "";
      myPipsResultFirst.innerHTML = "";
      myPipsResultSecond.innerHTML = "";
      myPipsResultThird.innerHTML = "";
      enemyPipsResultFirst.innerHTML = "";
      enemyPipsResultSecond.innerHTML = "";
      enemyPipsResultThird.innerHTML = "";
      isWon.innerHTML = "";
      displayGap.innerHTML = "";
      displayEnemyHand.innerHTML = "";
      displayMyHand.innerHTML = "";

      errorLog.innerHTML = "";
      start.style.display = "none";
      game(coin, betCoin).then(function (afterCoin) {
        myCoin.innerHTML = "現在の所持金：" + afterCoin + "ペリカ";
        coin = afterCoin;
        start.style.display = "block";
      });
    }

  });

  myCoin.innerHTML = "現在の所持金：" + coin + "ペリカ";

  function dice() {

    var pips = [];

    for (var i = 0; i < 3; i++) {
      pips.push(Math.floor(Math.random() * 6) + 1);
    }

    return pips;

  };

  function hand(pips) {

    pips.sort(function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    var hand = [];

    if (pips[0] === pips[2]) {
      return hand = ["zoro", pips[0] * 10000];
    }

    if (pips[0] === pips[1]) {
      return hand = ["deme", pips[2]]; // hand の１番目の要素には１〜６のどれかの数字が入る。82行目も同様
    }

    if (pips[1] === pips[2]) {
      return hand = ["deme", pips[0]];
    }

    if (pips[0] === 4 && pips[1] === 5 && pips[2] === 6) {
      return hand = ["shigoro", 4560];
    }

    if (pips[0] === 1 && pips[1] === 2 && pips[2] === 3) {
      return hand = ["hifumi", -123]; // 滝本ひふみ => Takimoto Hifumi
    }

    if (pips[0] !== pips[1] && pips[1] !== pips[2]) {
      return hand = ["menashi", 0];
    }

  };

  function battle(myHand, enemyHand) {

    if (myHand % 10000 === 0) {
      myHand = 10000;
    } else if (enemyHand % 10000 === 0) {
      enemyHand = 10000;
    }

    var magnification = -40; // 倍率

    if (myHand[0] === enemyHand[0] && myHand[1] === enemyHand[1]) {
      return magnification = 0;
    } else {
      magnification = 1;
    }

    if (myHand[0] === "deme" && enemyHand[0] === "deme") {
      if (myHand[1] > enemyHand[1]) {
        return magnification = 1;
      } else {
        return magnification = -1;
      }
    }

    if (myHand[0] === "zoro" && enemyHand[0] === "shigoro") {
      return magnification = 1.5;
    } else if (myHand[0] === "shigoro" && enemyHand[0] === "zoro") {
      return magnification = -1.5;
    }

    // ここから、自分と相手の手役情報を読んで、倍率をかけ算で計算していく

    if (myHand[0] === "hifumi") {
      magnification *= 2;
    } else if (myHand[0] === "deme") {
      magnification *= 1;
    } else if (myHand[0] === "shigoro") {
      magnification *= 2;
    } else if (myHand[0] === "zoro") {
      magnification *= 3;
    }

    if (enemyHand[0] === "hifumi") {
      magnification *= 2;
    } else if (enemyHand[0] === "deme") {
      magnification *= 1;
    } else if (enemyHand[0] === "shigoro") {
      magnification *= 2;
    } else if (enemyHand[0] === "zoro") {
      magnification *= 3;
    }

    // 最後に相手と自分の手の大きさを比べて、プラスかマイナスかを判断する

    if (myHand[1] > enemyHand[1]) {
      return magnification * 1;
    } else {
      return magnification * -1;
    }

  };

  function payout(magnification, coin, betCoin) {

    if (magnification === 0) {
      isWon.innerHTML = "分け";
    } else if (magnification >= 1) {
      isWon.innerHTML = "<font color='#ff0000'>勝ち</font>";
    } else {
      isWon.innerHTML = "<font color='#0000ff'>負け</font>";
    }

    var tmp = coin;

    coin = coin + betCoin * magnification;

    var gap = coin - tmp;

    if (gap > 0) {
      displayGap.innerHTML = "＋" + gap + "ペリカ";
    } else if (gap < 0) {
      displayGap.innerHTML = "ー" + Math.abs(gap) + "ペリカ";
    } else {
      displayGap.innerHTML = "±０ペリカ"
    }

    return coin;

  };

  function shake(isMyTurn) {

    var pips = dice();

    if (isMyTurn === "myTurn") {
      changeDice("myDice01", pips[0]);
      changeDice("myDice02", pips[1]);
      changeDice("myDice03", pips[2]);
    } else {
      changeDice("enemyDice01", pips[0]);
      changeDice("enemyDice02", pips[1]);
      changeDice("enemyDice03", pips[2]);
    }

    var result = hand(pips);
    return result;

  };

  function drawHand(isMyTurn, candidate) {

    var hand = candidate[0];
    var point = candidate[1];

    var draw = "";

    switch (hand) {
      case "hifumi":
        draw = "ヒフミ　";
        break;
      case "shigoro":
        draw = "シゴロ　";
        break;
      case "zoro":
        draw = (point / 10000) + "ゾロ　";
        break;
      case "deme":
        draw = point + "の出目";
        break;
      default:
        draw = "目無し　";
        break;
    }

    if (isMyTurn === "myTurn") {
      return draw;
    } else {
      return draw;
    }

  };

  function myTurn() {

    return new Promise((resolve, reject) => {

      var firstShake = document.getElementById("firstShake");
      firstShake.style.display = "block";

      var myCandidate = [];
      var myTurnEnd = document.getElementById("myTurnEnd");

      firstShake.addEventListener("click", () => {

        firstShake.style.display = "none";
        howManyTimes.innerHTML = "１回目";
        myCandidate = shake("myTurn");

        if (myCandidate[0] !== "menashi") {
          shakeAgain.style.display = "none";
          myTurnEnd.style.display = "block";
          myTurnEnd.addEventListener("click", () => {
            myTurnEnd.style.display = "none";
            resolve(myCandidate);
          });
        } else {
          shakeAgain.style.display = "block";
          myTurnEnd.style.display = "none";
          shakeAgain.addEventListener("click", () => {

            howManyTimes.innerHTML = "２回目";
            shakeAgain.style.display = "none";
            myCandidate = shake("myTurn");

            if (myCandidate[0] !== "menashi") {
              shakeAgain.style.display = "none";
              myTurnEnd.style.display = "block";
              myTurnEnd.addEventListener("click", () => {
                myTurnEnd.style.display = "none";
                resolve(myCandidate);
              });
            } else {
              myTurnEnd.style.display = "none";
              shakeAgain.style.display = "block";
              shakeAgain.addEventListener("click", () => {

                howManyTimes.innerHTML = "３回目";
                shakeAgain.style.display = "none";
                myCandidate = shake("myTurn");
                myTurnEnd.style.display = "block";
                myTurnEnd.addEventListener("click", () => {
                  myTurnEnd.style.display = "none";
                  resolve(myCandidate);
                });
              });
            }
          });

        }
      });
    });

  };

  function setTimeoutAsync(delay) {

    return new Promise(function (resolve, reject) {
      setTimeout(resolve, delay);
    });

  };

  function enemyTurn() {

    return new Promise((resolve, reject) => {

      var enemyCandidate = [];

      setTimeoutAsync(1500)
        .then(() => {
          howManyTimes.innerHTML = "";
          enemyHowManyTimes.innerHTML = "１回目";
          enemyCandidate = shake("enemyTurn");
          if (enemyCandidate[0] === "menashi") {
            setTimeoutAsync(2000)
              .then(() => {
                enemyHowManyTimes.innerHTML = "２回目";
                enemyCandidate = shake("enemyTurn");
                if (enemyCandidate[0] === "menashi") {
                  setTimeoutAsync(2000)
                    .then(() => {
                      enemyHowManyTimes.innerHTML = "３回目";
                      enemyCandidate = shake("enemyTurn");
                      resolve(enemyCandidate);
                    });
                } else {
                  resolve(enemyCandidate);
                }
              });
          } else {
            resolve(enemyCandidate);
          }
        });

    });

  };

  function game(coin, betCoin) {
    return new Promise(function (resolve, reject) {
      start.style.display = "none";

      changeDice("myDice01", 7);
      changeDice("myDice02", 7);
      changeDice("myDice03", 7);
      changeDice("enemyDice01", 7);
      changeDice("enemyDice02", 7);
      changeDice("enemyDice03", 7);

      myTurn().then((myResult) => {
        myHand = myResult;
        displayMyHand.innerHTML = drawHand("myTurn", myResult);
        enemyTurn().then((enemyResult) => {
          displayEnemyHand.innerHTML = drawHand("enemyTurn", enemyResult);
          enemyHand = enemyResult;
          setTimeoutAsync(2000)
            .then(() => {
              coin = payout(battle(myHand, enemyHand), coin, betCoin);
              resolve(coin);
            });
        });
      });
    });
  };

});