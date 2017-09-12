window.addEventListener("load", function () {

  var coin = 1000;
  var myResult = 0;
  var enemyResult = 0;
  var result = 0;
  function calcResult(storm, hand, shigoro, hihumi, menashi) {

    if (storm > 0) {
      result = storm * 10000;
    }

    if (hand > 0) {
      result = hand * 100;
    }

    if (shigoro) {
      result = 9999;
    }

    if (hihumi) {
      result = -1230;
    }

    if (menashi === 3) {
      result = 1;
    }

    return result;

  }

  function displayResult(myResult, enemyResult) {

    if (myResult === 1) {
      myHand.innerHTML += "あなたの目は3回とも揃いませんでした。目なしです。";
    }

    if (myResult === -1230) {
      myHand.innerHTML += "あなたの目はヒフミです。";
    }

    if (myResult === 9999) {
      myHand.innerHTML += "あなたの目はシゴロです！";
    }

    if (myResult % 100 === 0 && myResult < 10000) {
      myHand.innerHTML += "あなたの目は" + (myResult / 100) + "です。";
    }

    if (myResult === 10000) {
      myHand.innerHTML += "あなたの目はピンゾロです！！";
    } else if (myResult % 10000 === 0 && myResult >= 20000) {
      myHand.innerHTML += "あなたの目は" + (myResult / 10000) + "ゾロです！！";
      myResult = 10000;
    }

    // ここまで自分の目の判定

    if (enemyResult === 1) {
      enemyHand.innerHTML += "敵の目は　　3回とも揃いませんでした。目なしです。"
    }

    if (enemyResult === -1230) {
      enemyHand.innerHTML += "敵の目は　　ヒフミです！";
    }

    if (enemyResult === 9999) {
      enemyHand.innerHTML += "敵の目は　　シゴロです・・・！";
    }

    if (enemyResult % 100 === 0 && enemyResult < 10000) {
      enemyHand.innerHTML += "敵の目は　　" + (enemyResult / 100) + "です。";
    }

    if (enemyResult === 10000) {
      enemyHand.innerHTML += "敵の目は　　ピンゾロです！！"
    } else if (enemyResult % 10000 === 0 && enemyResult >= 20000) {
      enemyHand.innerHTML += "敵の目は　　" + (enemyResult / 10000) + "ゾロです！！";
      enemyResult = 10000; // 今回はピンゾロも倍率は同じであるため、直す
    }

    // ここまで相手の目の判定

    if (myResult > enemyResult) {
      isWon.innerHTML = "あなたの勝ちです！";
    } else if (myResult === enemyResult) {
      isWon.innerHTML = "引き分けです。";
    } else {
      isWon.innerHTML = "あなたの負けです…";
    }

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

    if (myResult > enemyResult) {
      bairitsu *= 1;
    } else if (myResult < enemyResult) {
      bairitsu *= -1;
    }

    output.innerHTML += "デバッグ用：　倍率は " + bairitsu + " 倍";
    if (bairitsu === -1) {
      return coin -= betCoin;
    } else {
      return coin += betCoin * bairitsu;
    }
  }

  function tintirorin(coin, betCoin) {
    var tintirorinCounter = 0;
    while (tintirorinCounter < 2) {

      if (tintirorinCounter === 0) {
        output.innerHTML += "あなたの出目は・・・";
      } else {
        output.innerHTML += "敵の出目は・・・";
      }

      var pips = [];
      var storm = 0; // アラシを直訳ｗｗ　3つの目が同じだった時、その数字を値にして返す
      var hand = 0;
      var shigoro = 0; // まんま
      var hihumi = 0; // まんま
      var menashi = 0; // まんま
      var times = 1; // 回数表示

      while (menashi < 3) {
        for (var i = 0; i < 3; i++) { // 3つのサイコロを振って
          pips.push(Math.floor(Math.random() * 6) + 1); // 配列の中に結果を入れる
        };

        pips.sort(function (a, b) { // その三つの数字を小さい順に並べる
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });

        if (pips[0] !== pips[1] !== pips[2]) {
          menashi++;
        }

        if (pips[0] === pips[2]) { // 0番目と2番目が同じ。それすなわち1番目も同じ！！
          menashi = 4;
          storm = pips[0];
          pipsResult.innerHTML += times + "回目 " + pips.join(", ");
          break; // handの判定が引っかかるのでbreakで避難。一応専用のconsole.log()を追加。
        }

        if (pips[0] === pips[1]) {
          menashi = 4;
          hand = pips[2];
        } else if (pips[1] === pips[2]) {
          menashi = 4;
          hand = pips[0];
        }

        if (pips[0] === 4 && pips[1] === 5 && pips[2] === 6) {
          menashi = 4;
          shigoro = 1;
        }

        if (pips[0] === 1 && pips[1] === 2 && pips[2] === 3) {
          menashi = 4;
          hihumi = 1;
        }


        pipsResult.innerHTML += times + "回目 " + pips.join(", ");


        pips = [];
        times++;

      };

      calcResult(storm, hand, shigoro, hihumi, menashi);

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

    displayResult(myResult, enemyResult);

    if (myResult % 10000 === 0 && myResult >= 20000) {
      myResult = 10000; // 今回はピンゾロも倍率は同じであるため、直す
    }
    if (enemyResult % 10000 === 0 && enemyResult >= 20000) {
      enemyResult = 10000;
    }

    console.log(myResult, enemyResult, coin, betCoin);
    coin = battle(myResult, enemyResult, coin, betCoin); // コインのみ返す

    myResult = 0;
    enemyResult = 0;

    return coin;

  };

  start.addEventListener("click", function () {
    var betCoin = document.getElementById("betCoin").value;
    var again = document.getElementById("again");
    var myHand = document.getElementById("myHand");
    var enemyHand = document.getElementById("enemyHand");
    var isWon = document.getElementById("isWon");
    betCoin = Number(betCoin);
    console.log(betCoin)
    if (coin <= 0) {
      output.innerHTML = "<p>ゲームオーバー！</p>";
    } else if (coin - betCoin < 0) {
      output.innerHTML = "<p>金額が不足しています。</p>";
    } else if (isNaN(betCoin) || betCoin <= 0) {
      output.innerHTML = "<p>正しい数値を入力してください。</p>";
    } else {
      output.innerHTML = "";
      pipsResult.innerHTML = "";
      myHand.innerHTML = "";
      enemyHand.innerHTML = "";
      isWon.innerHTML = "";
      coin = tintirorin(coin, betCoin);
      myCoin.innerHTML = "<p>現在の所持金：" + coin + "</p>";
    }
  })

  myCoin.innerHTML = "<p>現在の所持金：" + coin + "</p>";

});