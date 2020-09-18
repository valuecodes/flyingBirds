class Background{
  constructor(el,bg='url("./img/bg.png")'){
      this.el = el
    
      this.style={
        top: 0,
        left: 0,
        position: "fixed",
        height: "100%",
        width: "100vw",
        backgroundImage: bg,
        backgroundRepeat: "repeat-x",
        backgroundSize: "cover",
        backgroundPosition: "0 0",
      }
      this.moveRatio = 50
      Object.assign(this.el.style, this.style);
  }

  scrollSideWays(distance){
    this.el.style.backgroundPosition = `-${distance/this.moveRatio}px 0px`;
  }

}

class Pipe{
  constructor(parentEl){
    this.id = 'pipe_' + Math.floor(Math.random() * 2000);
    this.imgSrc = './img/pipe.png';
    this.size = null;
    this.style = {
        position: 'fixed',
        top: null,
        left: Math.floor(Math.random() * 2000) + 'px',
        width: Math.floor(Math.random() * 200) + 'px',
        bottom: 0
    };
    this.flip = false;
    this.moveRatio = 20;

    var pipeEl = document.createElement('img');
    pipeEl.src = this.imgSrc;
    pipeEl.id = this.id;
    Object.assign(pipeEl.style, this.style); 
    parentEl.appendChild(pipeEl);
  }

  moveLeft(distance) {
    let _current = parseInt(this.style.left)
    document.getElementById(this.id).style.left = `${_current - distance / this.moveRatio}px`;
  }

}


class Bird{
  constructor(parentEl){
    this.id = 'bird_' + Math.floor(Math.random() * 2000);
    this.imgSrc = './img/bird.png';  
    this.jumping = false
    this.style = {
      position: 'fixed',
      top: Math.floor(Math.random() * 70) + '%',
      left: Math.floor(Math.random() * 2000) + 'px',
      width: Math.floor(Math.random() * 200) + 'px',
    };
    this.movementRatio = 10

    var birdEl = document.createElement('img');
    birdEl.src = this.imgSrc;
    birdEl.id = this.id;
    Object.assign(birdEl.style, this.style); 
    parentEl.appendChild(birdEl);
    this.addGravity()
    document.getElementById(this.id).addEventListener('click',function(){
      this.jump()
    }.bind(this))
  }

  moveLeft(distance){
    let _current = parseInt(this.style.left);
    document.getElementById(this.id).style.left = `${_current + distance / this.movementRatio}px`;  
  }

  addGravity(){
    let scope=this
    setInterval(function(){
      if(scope.jumping){
        return
      }
      let _current = parseInt(scope.style.top);
      let _new = _current < 95 ? _current + 1 : _current
      scope.style.top = _new

      document.getElementById(scope.id).style.top = `${_current+1}%`

    },1000/20)
  }

  jump(){
    let scope = this
    this.jumping = true
    let counter = 0
    
    setInterval(function(){
      if(counter===10){
        scope.jumping=false
        return
      }
      counter++;
      let _current = parseInt(scope.style.top);
      let _new = _current > 1 ? _current - 1 : _current
      scope.style.top = _new

      document.getElementById(scope.id).style.top = `${_current}%`

    },1000/75)
  }

}

$(document).ready(function () {

  let background = new Background(document.getElementById('background'))

  let pipe1 = new Pipe(document.body);
  let pipe2 = new Pipe(document.body);
  let pipe3 = new Pipe(document.body);
  let pipe4 = new Pipe(document.body);

  let bird1 = new Bird(document.body);
  let bird2 = new Bird(document.body);
  let bird3 = new Bird(document.body);
  let bird4 = new Bird(document.body);  

  document.addEventListener('scroll', function(){
    var offset = window.scrollY
    background.scrollSideWays(offset)
    pipe1.moveLeft(offset)
    pipe2.moveLeft(offset)
    pipe3.moveLeft(offset)
    pipe4.moveLeft(offset)

    bird1.moveLeft(offset)
    bird2.moveLeft(offset)
    bird3.moveLeft(offset)
    bird4.moveLeft(offset)

  })

});
