// get buttons
const btn_row_one = document.getElementById('flip_content_one');
const btn_row_two = document.getElementById('flip_content_two');
const btn_row_three = document.getElementById('flip_content_three');
const btn_row_four = document.getElementById('flip_content_four');
const btn_col_one = document.getElementById('flip_content_five');
const btn_col_two = document.getElementById('flip_content_six');
const btn_col_three = document.getElementById('flip_content_seven');
const btn_col_four = document.getElementById('flip_content_eight');
const btn_diagonal = document.getElementById('flip_content_nine');

//get picture segments
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const ten = document.getElementById('ten');
const eleven = document.getElementById('eleven');
const twelve = document.getElementById('twelve');
const thirteen = document.getElementById('thirteen');
const fourteen = document.getElementById('fourteen');
const fifteen = document.getElementById('fifteen');
const sixteen = document.getElementById('sixteen');

//every time a button is clicked, do the corresponding flipping
btn_row_one.onclick = function() {
    one.classList.toggle('flip');
    two.classList.toggle('flip');
    three.classList.toggle('flip');
    four.classList.toggle('flip');
    gg();
    counting();
}

btn_row_two.onclick = function() {
    five.classList.toggle('flip');
    six.classList.toggle('flip');
    seven.classList.toggle('flip');
    eight.classList.toggle('flip');
    gg();
    counting();
}

btn_row_three.onclick = function() {
    nine.classList.toggle('flip');
    ten.classList.toggle('flip');
    eleven.classList.toggle('flip');
    twelve.classList.toggle('flip');
    gg();
    counting();
}

btn_row_four.onclick = function() {
    thirteen.classList.toggle('flip');
    fourteen.classList.toggle('flip');
    fifteen.classList.toggle('flip');
    sixteen.classList.toggle('flip');
    gg();
    counting();
}

btn_col_one.onclick = function() {
    one.classList.toggle('flip');
    five.classList.toggle('flip');
    nine.classList.toggle('flip');
    thirteen.classList.toggle('flip');
    gg();
    counting();
}

btn_col_two.onclick = function() {
    two.classList.toggle('flip');
    six.classList.toggle('flip');
    ten.classList.toggle('flip');
    fourteen.classList.toggle('flip');
    gg();
    counting();
}

btn_col_three.onclick = function() {
    three.classList.toggle('flip');
    seven.classList.toggle('flip');
    eleven.classList.toggle('flip');
    fifteen.classList.toggle('flip');
  gg();
    counting();
}

btn_col_four.onclick = function() {
    four.classList.toggle('flip');
    eight.classList.toggle('flip');
    twelve.classList.toggle('flip');
    sixteen.classList.toggle('flip');
    gg();
    counting();
}

btn_diagonal.onclick = function() {
    four.classList.toggle('flip');
    seven.classList.toggle('flip');
    ten.classList.toggle('flip');
    thirteen.classList.toggle('flip');
    gg();
    counting();
}

// good game function: evaluate the winning situation
function gg(){
    const array = [];

    // check class name for front or back face
    for (let i = 0; i+3<=48; i+=3) {
        const elem = document.getElementById("fl_container");
        array[i]=elem.getElementsByTagName("div")[i].getAttribute("class");
    }

    // if class name is empty, the segment is on its front face
    const isequal = array.every((val) => {
        return val === '';
    });

    // winning alert box
    if(isequal){
        setTimeout(function(){ alert("You win!"); }, 1000);
    }
}

// count the number of clicks
let clicks = 0;
function counting() {
    clicks += 1;
    document.getElementById("steps").innerHTML = clicks;
}


