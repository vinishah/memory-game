$(document).ready(function(){
  var count;
  var board;
  var minutes;
  var seconds;
  var highscore = 10000;
  var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"];
  function newGame(){
    count = 0;
    board = {
        a: {cat: "one", status: 'down'},
        b: {cat: "seven", status: 'down'},
        c: {cat: "two", status: 'down'},
        d: {cat: "one", status: 'down'},
        e: {cat: "three", status: 'down'},
        f: {cat: "two", status: 'down'},
        g: {cat: "eight", status: 'down'},
        h: {cat: "four", status: 'down'},
        i: {cat: "three", status: 'down'},
        j: {cat: "five", status: 'down'},
        k: {cat: "four", status: 'down'},
        l: {cat: "six", status: 'down'},
        m: {cat: "five", status: 'down'},
        n: {cat: "seven", status: 'down'},
        o: {cat: "six", status: 'down'},
        p: {cat: "eight", status: 'down'}
      }
    letters = shuffleArray(letters);
    startTimer();
    renderBoard();
  }
  newGame();

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }

  
  function renderBoard(){
    $(".board").empty();
    for(var i = 0; i < letters.length; i++){
      var l = letters[i];
      $('.board').append("<div class = 'tile "+ board[l]['status']+" "+ board[l]['cat']+"' id='"+ l + "'>"+"</div>");
    }
  }
  
  function turn(tile){
    board[tile]["status"]="up";
    count ++;
    if(count % 2 == 0){
      setTimeout(function(){
        check_board(8);
        winner();
      }, 100);

    }
  }

  function check_board(pairs){
    var cats =["one","two","three","four","five","six","seven","eight"]
    for(i=0;i<=pairs;i++){
      check_catergory(board, cats[i]);
    }
  }

  function check_catergory(board,category){
    var total = 0;
    $.each(board, function(id,tile){
      if(tile["cat"]==category && tile["status"]=='up'){
      total+=1}
    });
    if(total==1){
      $.each(board, function(id,tile){
        if(tile["cat"]==category){
          tile["status"]='down';
        }
      });
    }
  }

  function startTimer(duration, display) {
    seconds = 0;
    minutes = 0;
    setInterval(function () {
      seconds++;
      if(seconds === 60){
        seconds = 0;
        minutes++;
      }
        st="00"+seconds;
        mt="00"+minutes;
        $(".timer").text(mt.slice(-2)+":"+st.slice(-2));
    }, 1000);
  }

  function winner(){
    var count = 0;
    $.each(board, function(id,tile){
      if(tile.status === 'down'){
        count++;
      }
    });
    if(count === 0){
      var totalSecs = seconds + minutes*60;
      if(totalSecs < highscore){
        highscore = totalSecs;
      }
      $(".highscore").text("Best Time: "+highscore);
      newGame();
    }
  }

  $('body').on('click','.tile', function(){
    turn(this.id);
    renderBoard();
  });


});