window.addEventListener("load", function () {

  var coin = 1000;
  var myResult = 0;
  var enemyResult = 0;


  function shake(candidateHand, times, tintirorinCounter) {

    var pips = [];

    howManyTimes.innerHTML += times + "回目";

    for (var i = 0; i < 3; i++) { // 3つのサイコロを振って
      pips.push(Math.floor(Math.random() * 6) + 1); // 配列の中に結果を入れる
    };

    if (tintirorinCounter === 0) {
      myPipsResultFirst.innerHTML = pips[0];
      myPipsResultSecond.innerHTML = pips[1];
      myPipsResultThird.innerHTML = pips[2];
    } else {
      enemyPipsResultFirst.innerHTML = pips[0];
      enemyPipsResultSecond.innerHTML = pips[1];
      enemyPipsResultThird.innerHTML = pips[2];
    }

    pips.sort(function (a, b) { // その三つの数字を小さい順に並べる
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    console.log(pips);

    if (pips[0] === pips[2]) { // 0番目と2番目が同じ。それすなわち1番目も同じ！！

      if (tintirorinCounter === 0) {
        myHand.innerHTML = pips[0] + "ゾロ";
      } else {
        enemyHand.innerHTML = pips[0] + "ゾロ";
      }

      candidateHand[4] = 4;
      candidateHand[0] = pips[0];
      return candidateHand;

    }

    if (pips[0] === pips[1]) {

      if (tintirorinCounter === 0) {
        myHand.innerHTML = pips[2] + "の出目";
      } else {
        enemyHand.innerHTML = pips[2] + "の出目";
      }

      candidateHand[4] = 4;
      candidateHand[1] = pips[2];
      return candidateHand;

    } else if (pips[1] === pips[2]) {

      if (tintirorinCounter === 0) {
        myHand.innerHTML = pips[0] + "の出目";
      } else {
        enemyHand.innerHTML = pips[0] + "の出目";
      }

      candidateHand[4] = 4;
      candidateHand[1] = pips[0];
      return candidateHand;

    }

    if (pips[0] === 4 && pips[1] === 5 && pips[2] === 6) {

      if (tintirorinCounter === 0) {
        myHand.innerHTML = "シゴロ";
      } else {
        enemyHand.innerHTML = "シゴロ";
      }

      candidateHand[4] = 4;
      candidateHand[2] = 1;
      return candidateHand;

    }

    if (pips[0] === 1 && pips[1] === 2 && pips[2] === 3) {

      if (tintirorinCounter === 0) {
        myHand.innerHTML = "ヒフミ";
      } else {
        enemyHand.innerHTML = "ヒフミ";
      }

      candidateHand[4] = 4;
      candidateHand[3] = 1;
      return candidateHand;

    }

    if (pips[0] !== pips[1] && pips[1] !== pips[2]) {

      if (tintirorinCounter === 0) {
        myHand.innerHTML = "目なし";
      } else {
        enemyHand.innerHTML = "目なし";
      }

      candidateHand[4]++;
      return candidateHand;
    }

  }

  function calcResult(candidateHand) {

    var point = 0;

    if (candidateHand[4] <= 3) { // １回しか振っていないため(candidateHand[4] === 3)だとバグる。完成したら戻す
      point = 1;
    }

    if (candidateHand[0] > 0) {
      point = candidateHand[0] * 10000;
    }

    if (candidateHand[1] > 0) {
      point = candidateHand[1] * 100;
    }

    if (candidateHand[2]) {
      point = 9999;
    }

    if (candidateHand[3]) {
      point = -1230;
    }

    return point;

  }

  function battle(myResult, enemyResult, coin, betCoin) {
    var bairitsu = 1;

    if (myResult === enemyResult) {
      return coin;
    }

    if (myResult === 10000 || enemyResult === 10000) {
      bairitsu *= 3;
    }

    if (myResult === 9999 || enemyResult === 9999) {
      bairitsu *= 2;
    }

    if (myResult === -1230 || enemyResult === -1230) {
      bairitsu *= 2;
    }

    if (bairitsu === 6 && myResult - enemyResult === 1 || enemyResult - myResult === 1) {
      bairitsu = 1.5; // 現在どちらかがゾロ目を出し、かつどちらかにヒフミが出ていない（シゴロの）場合
    }

    if (myResult > enemyResult) {
      bairitsu *= 1;
    } else if (myResult < enemyResult) {
      bairitsu *= -1;
    }

    if (bairitsu === -1) {
      return coin -= betCoin;
    } else {
      return coin += betCoin * bairitsu;
    }
  }

  function tintirorin(coin, betCoin) {
    var tintirorinCounter = 0;
    while (tintirorinCounter < 2) {

      // storm, hand, shigoro, hihumi, menashi;
      var candidateHand = [0, 0, 0, 0, 0];

      var times = 1; // 回数表示

      // ここから未完成

      shake(candidateHand, times, tintirorinCounter);
      console.log(candidateHand);

      // ここまで未完成

      var result = calcResult(candidateHand);

      if (!myResult) {
        myResult = result;
        result = 0; // 結果の初期化
      } else {
        enemyResult = result;
        result = 0; // 一応
      }

      tintirorinCounter++;
      times = 1;

    }

    if (myResult % 10000 === 0 && myResult >= 20000) {
      myResult = 10000; // 今回はピンゾロも倍率は同じであるため、直す
    }
    if (enemyResult % 10000 === 0 && enemyResult >= 20000) {
      enemyResult = 10000;
    }

    if (myResult > enemyResult) {
      isWon.innerHTML = "あなたの勝ちです！";
    } else if (myResult === enemyResult) {
      isWon.innerHTML = "引き分けです。";
    } else {
      isWon.innerHTML = "あなたの負けです…";
    }

    coin = battle(myResult, enemyResult, coin, betCoin); // コインのみ返す

    myResult = 0;
    enemyResult = 0;

    return coin;

  };

  start.addEventListener("click", function () {

    var betCoin = document.getElementById("betCoin").value;
    var howManyTimes = document.getElementById("howManyTimes");
    var again = document.getElementById("again");
    var myHand = document.getElementById("myHand");
    var enemyHand = document.getElementById("enemyHand");
    var isWon = document.getElementById("isWon");
    var errorLog = document.getElementById("errorLog");
    var myPipsResultFirst = document.getElementById("myPipsResultFirst");
    var myPipsResultSecond = document.getElementById("myPipsResultSecond");
    var myPipsResultThird = document.getElementById("myPipsResultThird");
    var enemyPipsResultFirst = document.getElementById("enemyPipsResultFirst");
    var enemyPipsResultSecond = document.getElementById("enemyPipsResultSecond");
    var enemyPipsResultThird = document.getElementById("enemyPipsResultThird");

    betCoin = Number(betCoin);
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
      output.innerHTML = "";
      myPipsResultFirst.innerHTML = "";
      myPipsResultSecond.innerHTML = "";
      myPipsResultThird.innerHTML = "";
      enemyPipsResultFirst.innerHTML = "";
      enemyPipsResultSecond.innerHTML = "";
      enemyPipsResultThird.innerHTML = "";
      myHand.innerHTML = "";
      enemyHand.innerHTML = "";
      isWon.innerHTML = "";
      errorLog = "";
      coin = tintirorin(coin, betCoin);
      myCoin.innerHTML = "現在の所持金：" + coin + "ペリカ";
    }
  })

  myCoin.innerHTML = "現在の所持金：" + coin + "ペリカ";

});