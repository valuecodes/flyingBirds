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
      left: 50+ 'px',
      width: 200 + 'px',
    };
    this.movementRatio = 0
    var birdEl = document.createElement('img');
    birdEl.src = this.imgSrc;
    birdEl.id = this.id;
    this.gravity = 1
    Object.assign(birdEl.style, this.style); 
    parentEl.appendChild(birdEl);
    this.addGravity()
    document.body.addEventListener('click',function(){
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

    },1000/40)
  }

  jump(){
    let scope = this
    this.jumping = true
    let counter = 0
    
    setInterval(function(){
      if(counter===20){
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
  let pipes = []
  for(var i=0;i<20;i++){
    pipes.push(new Pipe(document.body))
  }
  let bird = new Bird(document.body);


  let offset = 0

  setInterval(()=>{
    background.scrollSideWays(offset)
    pipes.forEach(pipe => pipe.moveLeft(offset))
    bird.moveLeft(offset)
    document.documentElement.scrollLeft = offset/5
    let docPos = document.documentElement.scrollLeft
    let birdPosition = bird.style.top
    if(birdPosition<90&&birdPosition>5){
      offset+=8
    }
    if(docPos>3600&&birdPosition>50){
      bird.jump()
    }
  },10)

});
