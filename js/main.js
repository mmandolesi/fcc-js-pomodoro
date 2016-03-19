$(document).ready(function(){
  var breaktime = 0;
  var worktime = 0;
  var msEndTime, msTimeLeft, element, msLeft, mins, secs, time, timerSession;
  var running = false;
  var breakMsg = document.getElementById("message");
  var isBreak = false;

  $("#break-time-add").on("click", function() {
    breaktime = parseInt(document.getElementById('break-time').innerHTML);
    if (breaktime == 60) {
      $("#break-time").text(breaktime);
    } else {
      $("#break-time").text(breaktime + 1);
    }
  });
  $("#break-time-sub").on("click", function() {
    breaktime = parseInt(document.getElementById('break-time').innerHTML);
    if (breaktime == 1) {
      $("#break-time").text(breaktime);
    } else {
      $("#break-time").text(breaktime - 1);
    }
  });
  $("#work-time-add").on("click", function() {
    worktime = parseInt(document.getElementById('work-time').innerHTML);
    if (worktime == 60) {
      $("#work-time").text(worktime);
    } else {
      $("#work-time").text(worktime + 1);
    }
  });
  $("#work-time-sub").on("click", function() {
    worktime = parseInt(document.getElementById('work-time').innerHTML);
    if (worktime == 1) {
      $("#work-time").text(worktime);
    } else {
      $("#work-time").text(worktime - 1);
    }
  });

  $("#start").on("click", function() {
    running = true;
    countdown("timer", document.getElementById('work-time').innerHTML);
  });

  $("#stop").on("click", function() {
    breakMsg.style.visibility = "hidden";
    running = false;
    document.getElementById('timer').innerHTML = twoDigits(document.getElementById('work-time').innerHTML) + ":00";
  });

  function countdown(elementName, minutes) {
    // breakMsg.style.visibility = "hidden";
    element = document.getElementById("timer");
    msEndTime = (+new Date) + ( 1000 * ((minutes*60)) );
    timerSession = setInterval(updateTimer, 1000);
  }

  function updateTimer() {

    msTimeLeft = msEndTime - (+new Date);
    if (!running) {
      clearInterval(timerSession);
    }
    else {
      if (msTimeLeft < 1000) {
        // element.innerHTML = "Time is up!";
        var audio = new Audio('http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3');
        audio.play();
        clearInterval(timerSession);
        breakMsg.style.visibility = "visible";

        countdownBreak("timer", document.getElementById('break-time').innerHTML);

      }
      else {
        time = new Date(msTimeLeft);
        mins = time.getMinutes();
        secs = time.getSeconds();
        element.innerHTML = twoDigits(mins) + ":" + twoDigits(secs);
      }
    }
  }

  function twoDigits(n) {
    if (n <= 9) { return n = "0" + n; } else { return n; }
  }



  function countdownBreak(elementName, minutes) {
    // breakMsg.style.visibility = "hidden";
    element = document.getElementById("timer");
    msEndTime = (+new Date) + ( 1000 * ((minutes*60)) );
    timerSession = setInterval(updateTimerBreak, 1000);
  }

  function updateTimerBreak() {

    msTimeLeft = msEndTime - (+new Date);
    if (!running) {
      clearInterval(timerSession);
    }
    else {
      if (msTimeLeft < 1000) {
        element.innerHTML = "Time is up!";
        var audio = new Audio('http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3');
        audio.play();
        clearInterval(timerSession);
        breakMsg.style.visibility = "hidden";
      }
      else {
        time = new Date(msTimeLeft);
        mins = time.getMinutes();
        secs = time.getSeconds();
        element.innerHTML = twoDigits(mins) + ":" + twoDigits(secs);
      }
    }
  }



  // function stopCountdown(c) {
  //   clearInterval(c)
  // }

});
