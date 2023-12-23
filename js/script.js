gsap.from("#nav",{
    y:-100,
    delay:0.5,
    duration:1,
    opacity:0,
})

gsap.from("#platform",{
    y:100,
    delay:0.5,
    duration:1.2,
    opacity:0,
})

gsap.from("#gola",{
    y:-1000,
    delay:1,
    duration:1,
})

gsap.from("#page1>h1",{
    delay:1.4,
    duration:1,
    opacity:0,
    onUpdate:function(){
        $('#page1>h1').textillate({ in: { effect: 'fadeInUp' } });
    }
})


var tl=gsap.timeline({
    scrollTrigger:{
        trigger:"#page1",
        scroller:"body",
        // markers:true,
        start:"top -5%",
        scrub:4,
    }
});

var t2=gsap.timeline({
    scrollTrigger:{
        trigger:"#page1",
        scroller:"body",
        markers:true,
        start:"top -560%",
        end:"top -620%",
        scrub:2,
    }
});

// here 3 parameter in timeline anim1 is used to tell that we will move timeline in sync
tl.to("#gola",{
    left:"110%",
    top:"70vh",
    rotate:540,
    duration:2
},"anim1")

tl.to("#platform",{
    rotate:20,
},"anim1")

tl.to("#page2-in>h1",{
    delay:1,
    opacity:1,
    onUpdate:function(){
        $('#page2-in>h1').textillate({ in: { effect: 'fadeInUp' } });
    }
},"anim1")

tl.to(".snake__text-path",{
    delay:1,
    opacity:1,
    scrub:5,
    onStart:function(){
        runSnake();
    }
},"anim1")


function runSnake(){  
    var snakeStartPoint=100;
    var snakeRail=document.querySelector(".snake__text-path");

    if(snakeStartPoint>0){
        setInterval(function(){
            snakeStartPoint--;
            snakeRail.setAttribute("startOffset",`${snakeStartPoint}%`);
        },50)
    }else{
        a=0;
    }
}

t2.to("#whiteCircle",{
    scale:10,
},"anim1")
