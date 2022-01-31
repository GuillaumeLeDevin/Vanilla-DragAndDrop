let base = document.querySelector('.base');
const firstBox = document.getElementById('first-box');
const boxes = document.querySelectorAll('.box');
const destroy = document.querySelector('.destroy')
const allBoxes = [];
const choice = [];
let currentPicture;

for(i = 0; i < boxes.length; i++) {
    allBoxes.push(boxes[i]);
}
allBoxes.push(destroy);

let pictIndex = 1;

base.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${pictIndex})`;
currentPicture = `url(https://loremflickr.com/320/240?random=${pictIndex})`;

function newBase() {

    const newBase = document.createElement('div');
    newBase.setAttribute('class','base');
    newBase.setAttribute('draggable','true');
    pictIndex++;
    newBase.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${pictIndex})`;
    currentPicture = `url(https://loremflickr.com/320/240?random=${pictIndex})`;

    firstBox.appendChild(newBase);
    base = newBase;
}

for( const empty of allBoxes) {

    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('drop', dragDrop);

}

function dragDrop() {

    if(this.id === 'first-box'){
        return;
    }

    // destroy
    if(this.id === 'destroy') {
        base.remove();
        newBase();
        return;
    }

    //locked
    this.removeEventListener('drop', dragDrop);
    this.removeEventListener('dragenter', dragEnter);
    this.removeEventListener('dragover', dragOver);

    this.appendChild(base);
    this.childNodes[0].setAttribute('draggable', 'false');
    newBase();

    choice.push(currentPicture);
    if(choice.length === 3){
        setTimeout(() => {
            alert('End of selection!!!');
        })
    }

}

function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}