initLocomotiveWithScrollTrigger=function(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

initLocomotiveWithScrollTrigger();


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
        scroller:"#main",
        // markers:true,
        start:"top -5%",
        scrub:4,
    }
});

var t2=gsap.timeline({
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        // markers:true,
        start:"top -540%",
        end:"top -620%",
        scrub:1,
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

t2.to("#page6 h1",{
    delay:10,
    onStart:function(){
        $('#page6 h1').textillate({ in: { effect: 'fadeInUp' } });
    }
},"anim1")

var floatingImagesDiv=document.querySelectorAll(".page5RightElem");
floatingImagesDiv.forEach((elem)=>{
    elem.addEventListener("mouseenter",()=>{
       elem.childNodes[7].style.opacity=1;
    });
    elem.addEventListener("mouseleave",()=>{
        elem.childNodes[7].style.opacity=0;
    });
    elem.addEventListener("mousemove",(dets)=>{
        console.log(dets)
        elem.childNodes[7].style.left=`${dets.x/40}%`;
        // elem.childNodes[7].style.top=`${dets.y}px`;
    });
})

// gsap.to("#navPart1navInner h3",{
//     y:"-210%",
//     delay:2,
//     duration:2,
// });