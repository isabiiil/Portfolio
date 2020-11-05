// Particle credit to Y Endo
function random(low, high) {
  return Math.random() * (high - low) + low;
}

class Visual {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.particleLength = 150;
    this.particles = [];
    this.particleMaxRadius = 50;

    this.handleMouseMoveBind = this.handleMouseMove.bind(this);
    this.handleResizeBind = this.handleResize.bind(this);

    this.initialize();
    this.render();
  }

  // Initialize particles
  initialize() {
    this.resizeCanvas();
    for (let i = 0; i < this.particleLength; i++) {
      this.particles.push(this.createParticle(i));
    }
    this.bind();
  }

  // bind event listeners
  bind() {
    document.body.addEventListener('mousemove', this.handleMouseMoveBind, false);
    window.addEventListener('resize', this.handleResizeBind, false);
  }

  unbind() {
    document.body.removeEventListener('mousemove', this.handleMouseMoveBind, false);
    window.removeEventListener('resize', this.handleResizeBind, false);
  }

  handleMouseMove(e) {
    this.enlargeParticle(e.clientX, e.clientY);
  }

  handleResize() {
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvasWidth = document.body.offsetWidth;
    this.canvasHeight = document.body.offsetHeight;
    this.canvas.width = this.canvasWidth * window.devicePixelRatio;
    this.canvas.height = this.canvasHeight * window.devicePixelRatio;
    this.context = this.canvas.getContext('2d');
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  // particle creation
  createParticle(id, isRecreate) {
    // randomize position and radius
    const radius = random(5, this.particleMaxRadius);
    const x = isRecreate ? -radius - random(0, this.canvasWidth) : random(0, this.canvasWidth);
    let y = random(this.canvasHeight / 2 - 150, this.canvasHeight / 2 + 150);
    y += random(-100, 100);

    const alpha = random(0.05, 1.5);

    // pick random colour
    var col
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        col = [253, 223, 223];
        break;
      case 1:
        col = [222, 243, 253];
        break;
      case 2:
        col = [240, 222, 253];
        break;
    }

    return {
      id: id,
      x: x,
      y: y,
      startY: y,
      radius: radius,
      defaultRadius: radius,
      startAngle: 0,
      endAngle: Math.PI * 2,
      alpha: alpha,
      ref_alpha: alpha,
      color: { r: col[0], g: col[1], b: col[2] },
      speed: alpha,
      amplitude: random(50, 200)
    };
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.moveParticle(particle);
      this.context.beginPath();
      this.context.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`;
      this.context.arc(particle.x, particle.y, particle.radius, particle.startAngle, particle.endAngle);
      this.context.fill();
    });
  }

  moveParticle(particle) {
    particle.x += particle.speed;
    particle.y = particle.startY + particle.amplitude * Math.sin(((particle.x / 6) * Math.PI) / 180);
  }

  enlargeParticle(clientX, clientY) {
    this.particles.forEach(particle => {

      const distance = Math.hypot(particle.x - clientX, particle.y - clientY);

      if (distance <= 100) {
        const scaling = (100 - distance) / 12;
        TweenMax.to(particle, 0.5, {
          radius: particle.defaultRadius + scaling,
          alpha: 1,
          ease: Power2.easeOut,
          speed: 1
        });
      } else {
        TweenMax.to(particle, 0.5, {
          radius: particle.defaultRadius,
          ease: Power2.easeOut,
          alpha: particle.ref_alpha,
          speed: particle.ref_alpha
        });
      }
    });
  }

  render() {
    this.context.clearRect(0, 0, this.canvasWidth + this.particleMaxRadius * 2, this.canvasHeight);
    this.context.fillStyle = "#fbfffe";
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    this.drawParticles();

    // kill offscreen particles and re-render
    this.particles.forEach(particle => {
      if (particle.x - particle.radius >= this.canvasWidth) {
        this.particles[particle.id] = this.createParticle(particle.id, true);
      }
    });

    requestAnimationFrame(this.render.bind(this));
  }
}

new Visual();



// Rotating Text credit to alphardex
var words = document.querySelectorAll(".word");
words.forEach(function(word) {
  var letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach(function(letter) {
    var span = document.createElement("span");
    if (letter == " ") {
      span.textContent = " ";
      span.className = "letter";
      word.append(span);
    } else {
      span.textContent = letter;
      span.className = "letter";
      word.append(span);
    }
  });
});
var currentWordIndex = 0;
var maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";
var rotateText = function() {
  var currentWord = words[currentWordIndex];
  var nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  // rotate out letters of current word
  Array.from(currentWord.children).forEach(function(letter, i) {
    setTimeout(function() {
      letter.className = "letter out";
    }, i * 40);
  });
  // reveal and rotate in letters of next word
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach(function(letter, i) {
    letter.className = "letter behind";
    setTimeout(function() {
      letter.className = "letter in";
    }, 500 + i * 20);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
setTimeout(rotateText, 1000);
setInterval(rotateText, 3000);



// Jump to Bio
$("#landing-container").click(function() {
  $('html,body').animate({
    scrollTop: $("#bio-container").offset().top
  },
    duration = 1000);
});



// Experience descriptions
// function viewCaribouDesc() {
//   document.getElementById("descCaribou").style.display = "block";
//   document.getElementById("descInstructions").style.display = "none";
//   document.getElementById("descFiera").style.display = "none";
//   document.getElementById("descHAX").style.display = "none";
//   document.getElementById("descCUNY").style.display = "none";
//   document.getElementById("descKT").style.display = "none";
//   document.getElementById("descRWJBH").style.display = "none";
//   document.getElementById("descSinai").style.display = "none";
//   document.getElementById("descCUMC").style.display = "none";
//   document.getElementById("descHK").style.display = "none";
// }

// function viewFieraDesc() {
//   document.getElementById("descFiera").style.display = "block";
//   document.getElementById("descInstructions").style.display = "none";
//   document.getElementById("descCaribou").style.display = "none";
//   document.getElementById("descHAX").style.display = "none";
//   document.getElementById("descCUNY").style.display = "none";
//   document.getElementById("descKT").style.display = "none";
//   document.getElementById("descRWJBH").style.display = "none";
//   document.getElementById("descCUMC").style.display = "none";
//   document.getElementById("descSinai").style.display = "none";
//   document.getElementById("descHK").style.display = "none";
// }

// function viewHAXDesc() {
//   document.getElementById("descHAX").style.display = "block";
//   document.getElementById("descInstructions").style.display = "none";
//   document.getElementById("descCaribou").style.display = "none";
//   document.getElementById("descFiera").style.display = "none";
//   document.getElementById("descCUNY").style.display = "none";
//   document.getElementById("descKT").style.display = "none";
//   document.getElementById("descRWJBH").style.display = "none";
//   document.getElementById("descCUMC").style.display = "none";
//   document.getElementById("descSinai").style.display = "none";
//   document.getElementById("descHK").style.display = "none";
// }

// function viewCUNYDesc() {
//   document.getElementById("descCUNY").style.display = "block";
//   document.getElementById("descInstructions").style.display = "none";
//   document.getElementById("descCaribou").style.display = "none";
//   document.getElementById("descFiera").style.display = "none";
//   document.getElementById("descHAX").style.display = "none";
//   document.getElementById("descKT").style.display = "none";
//   document.getElementById("descRWJBH").style.display = "none";
//   document.getElementById("descCUMC").style.display = "none";
//   document.getElementById("descSinai").style.display = "none";
//   document.getElementById("descHK").style.display = "none";
// }

// function viewKTDesc() {
//   document.getElementById("descKT").style.display = "block";
//   document.getElementById("descInstructions").style.display = "none";
//   document.getElementById("descCaribou").style.display = "none";
//   document.getElementById("descFiera").style.display = "none";
//   document.getElementById("descHAX").style.display = "none";
//   document.getElementById("descCUNY").style.display = "none";
//   document.getElementById("descRWJBH").style.display = "none";
//   document.getElementById("descCUMC").style.display = "none";
//   document.getElementById("descSinai").style.display = "none";
//   document.getElementById("descHK").style.display = "none";
// }

// function viewRWJBHDesc() {
//   document.getElementById("descRWJBH").style.display = "block";
//   document.getElementById("descInstructions").style.display = "none";
//   document.getElementById("descCaribou").style.display = "none";
//   document.getElementById("descFiera").style.display = "none";
//   document.getElementById("descHAX").style.display = "none";
//   document.getElementById("descCUNY").style.display = "none";
//   document.getElementById("descKT").style.display = "none";
//   document.getElementById("descCUMC").style.display = "none";
//   document.getElementById("descSinai").style.display = "none";
//   document.getElementById("descHK").style.display = "none";
// }

// function viewCUMCDesc() {
//   document.getElementById("descCUMC").style.display = "block";
//   document.getElementById("descInstructions").style.display = "none";
//   document.getElementById("descCaribou").style.display = "none";
//   document.getElementById("descFiera").style.display = "none";
//   document.getElementById("descHAX").style.display = "none";
//   document.getElementById("descCUNY").style.display = "none";
//   document.getElementById("descKT").style.display = "none";
//   document.getElementById("descRWJBH").style.display = "none";
//   document.getElementById("descSinai").style.display = "none";
//   document.getElementById("descHK").style.display = "none";
// }

// function viewSinaiDesc() {
//   document.getElementById("descSinai").style.display = "block";
//   document.getElementById("descInstructions").style.display = "none";
//   document.getElementById("descCaribou").style.display = "none";
//   document.getElementById("descFiera").style.display = "none";
//   document.getElementById("descHAX").style.display = "none";
//   document.getElementById("descCUNY").style.display = "none";
//   document.getElementById("descKT").style.display = "none";
//   document.getElementById("descRWJBH").style.display = "none";
//   document.getElementById("descCUMC").style.display = "none";
//   document.getElementById("descHK").style.display = "none";
// }

// function viewHKDesc() {
//   document.getElementById("descHK").style.display = "block";
//   document.getElementById("descInstructions").style.display = "none";
//   document.getElementById("descCaribou").style.display = "none";
//   document.getElementById("descFiera").style.display = "none";
//   document.getElementById("descHAX").style.display = "none";
//   document.getElementById("descCUNY").style.display = "none";
//   document.getElementById("descKT").style.display = "none";
//   document.getElementById("descRWJBH").style.display = "none";
//   document.getElementById("descSinai").style.display = "none";
//   document.getElementById("descCUMC").style.display = "none";
// }
function viewWorkDesc(jobID) {
  var hide = document.getElementsByClassName("workDescription");
  for (i = 0; i < hide.length; i++) {
    hide[i].style.display = "none"
  }
  document.getElementById(jobID).style.display = "block"; 
}


// Projects dropdown menu
function viewProjDesc(projID) {
  var hide = document.getElementsByClassName("projectDescription");
  for (i = 0; i < hide.length; i++) {
    hide[i].style.display = "none"
  }
  document.getElementById(projID).style.display = "block";
}

// Services page folder aesthetic
$(document).ready(function() {
  $("#content").find("[id^='tab']").hide(); // Hide all content
  $("#tabs li:first").attr("id","current"); // Activate the first tab
  $("#content #tab1").fadeIn(); // Show first tab's content

  $('#tabs a').click(function(e) {
      e.preventDefault();
      if ($(this).closest("li").attr("id") == "current"){ //detection for current tab
       return;
      }
      else{
        $("#content").find("[id^='tab']").hide(); // Hide all content
        $("#tabs li").attr("id",""); //Reset id's
        $(this).parent().attr("id","current"); // Activate this
        $('#' + $(this).attr('name')).fadeIn(); // Show content for the current tab
      }
  });
});