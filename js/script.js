var infiniteBackground = {
  el: null,
  style: {
    top: 0,
    left: 0,
    position: "fixed",
    height: "100%",
    width: "100vw",
    backgroundImage: 'url("./img/bg.png")',
    backgroundRepeat: "repeat-x",
    backgroundSize: "cover",
    backgroundPosition: "0 0",
  },

  scrollSideWays: function () {
    var scope = this;
    document.addEventListener("scroll", function () {
      let topOffset = $(scope.el).offset().top;
      scope.el.style.backgroundPosition = `-${topOffset}px 0px`;
      console.log(topOffset);
    });
  },

  init: function (el) {
    this.el = el;
    Object.assign(this.el.style, this.style);
    this.scrollSideWays();
  },
};

var pipe = {
  imgSrc: "./img/pipe.png",
  size: null,
  style: {
    position: "fixed",
    top: null,
    left: null,
    width: null,
    bottom: 0,
  },
  flip: false,
  init: function (parentEl) {
    var pipeEl = document.createElement("img");

    pipeEl.src = this.imgSrc;
    this.style.left = Math.floor(Math.random() * 1000) + "px";
    this.style.width = Math.floor(Math.random() * 200) + "px";
    Object.assign(pipeEl.style, this.style);

    parentEl.appendChild(pipeEl);
  },
};

$(document).ready(function () {
  infiniteBackground.init(document.getElementById("background"));
  let pipe1 = pipe;
  let pipe2 = pipe;
  pipe1.init(document.body);
  pipe2.init(document.body);
  //   $(document).on("scroll", function (e) {
  //     console.log($("#overlay").offset().top);
  //     var topOffset = $("#overlay").offset().top;
  //     $("#overlay").css("background-position", `-${topOffset}px 0px`);
  //   });
});

let object = {
  value: null,
  name: null,
  init: function (value) {
    this.value = value;
  },
  print: function () {
    console.log(this.value);
  },
  addTwo: function () {
    this.value += 2;
    return this;
  },
  addThree: function () {
    this.value += 2;
    return this;
  },
  divideThree: function () {
    this.value /= 3;
    return this;
  },
  format: function (num) {
    console.log(num);
    return Number(this.value.toFixed(2));
  },
};

let object1 = object;
object1.init(3);
object1.print();
console.log(object1.addTwo().addTwo().divideThree().format());
object1.print();
