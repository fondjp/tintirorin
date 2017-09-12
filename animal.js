class Human {

  constructor(name, hand, foot, tail, nakigoe) {

    this.name = name;
    this.hand = hand;
    this.foot = foot;
    this.tail = tail;
    this.nakigoe = nakigoe;

  }

}



class Animal extends Human {

  say() {
    console.log("「" + this.nakigoe + "」");
  }

  howManyHand() {

    if (this.name === "アニマル") {
      console.log("アニマルさんの手は" + this.hand + "本あります");
    } else {
      console.log(this.name + "さんの手は" + this.hand + "本あります");
    }
  }

  work() {

    if (this.name === "アニマル") {
      console.log("アニマルさんは家族を養うため、いろんなところで叫んでいます");
    } else {
      console.log(this.name + "さんは機材購入のために自分の部屋で叫んでいます");
    }

  }

}


var hamaguchi = new Animal("アニマル", 2, 2, 0, "気合だーッ！");
var sonohoka = new Animal("フォンド", 2, 2, 0, "チャンネル登録してね！");

hamaguchi.howManyHand();
hamaguchi.work();
hamaguchi.say();

sonohoka.howManyHand();
sonohoka.work();
sonohoka.say();