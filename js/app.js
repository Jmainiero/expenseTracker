
//Todo
//1. Let user input the value
//2. Calculate the positive - negative = display at the top of the app

const vcontrol = {
  income: function () {
    var x = document.querySelectorAll('.cost--income');
    var y = 0;
    for (let i = 0; i < x.length; i++) {
      y += parseInt(x[i].innerText.slice(1), 10);
    }
    return y;
  },
  debt: function () {
    var x = document.querySelectorAll('.cost--debt');
    var y = 0;
    for (let i = 0; i < x.length; i++) {
      y += parseInt(x[i].innerText.slice(1), 10);
    }
    return y;
  },
  diff: function () {
    var x = this.income() - this.debt();
    if (x > 0) {
      return `+${x}`;
    } else {
      return `${x}`;
    }
  },
};

window.onload = () => { document.querySelector('.amnt').innerHTML = vcontrol.diff(); };


document.addEventListener('keypress', (evt) => {
  const vType = document.querySelector('#income-type').value;
  const desc = document.querySelector('.form__input--desc').value;
  const amnt = document.querySelector('.form__input--value').value;

  if (evt.keyCode === 13) {
    if (vType === '' || desc === '' || amnt === '') {
      alert('Please ensure you\'ve entered valid values for each item');
    } else {
      console.log(`Positive or negative? ${vType} and the desc is ${desc} and the amount is ${amnt}`);
      modList(vType, desc, amnt);
      document.querySelector('.amnt').innerHTML = vcontrol.diff();
    }
  }
});


const modList = (vType, desc, amnt) => {

  if (vType === '+') { //POSITIVE AMNT
    var item = document.createElement('div');
    item.className = 'line-item';
    item.innerHTML = `<p class="description description--income">${desc}</p>
    <p class="cost cost--income">\$${amnt}</p>`;
    document.querySelector('.income').appendChild(item);

  } else { //NEGATIVE AMNT
    var item = document.createElement('div');
    item.className = 'line-item';
    item.innerHTML = `<p class="description description--debt">${desc}</p>
    <p class="cost cost--debt">\$${amnt}</p>`;
    document.querySelector('.expenses').appendChild(item);
  }
};