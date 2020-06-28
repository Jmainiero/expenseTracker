let objInc = {},
  objExp = {};

//Object to control income, debt, and difference - Header display
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

//Set LocalStorage
const setStg = (et) => {
  if (et === '+') {
    var inc = document.querySelectorAll('.income .line-item');
    for (let i = 0; i < inc.length; i++) {
      objInc[inc[i].querySelector('.description').innerText] = inc[i].querySelector('.cost').innerText.slice(1);
    }
    localStorage.setItem('income', JSON.stringify(objInc));

  } else {
    console.log(et);
    var exp = document.querySelectorAll('.expenses .line-item');
    for (let i = 0; i < exp.length; i++) {
      objExp[exp[i].querySelector('.description').innerText] = exp[i].querySelector('.cost').innerText.slice(1);
    }
    localStorage.setItem('expenses', JSON.stringify(objExp));

  }
};
//Load Lists
const getStg = () => {
  let inc = JSON.parse(localStorage.getItem('income'));
  let exp = JSON.parse(localStorage.getItem('expenses'));

  for (key in inc) {
    modList('+', key, inc[key]);
  }
  for (key in exp) {
    modList('-', key, exp[key]);
  }

};

//Add items to their respective lists
const modList = (vType, desc, amnt) => {
  if (vType === '+') { //POSITIVE AMNT
    var item = document.createElement('div');
    item.className = 'line-item';
    item.innerHTML = `<p class="description description--income">${desc}</p>
    <p class="cost cost--income">\$${amnt}</p>
    <p class="trash">X</p>`;
    document.querySelector('.income').appendChild(item);

  } else { //NEGATIVE AMNT
    var item = document.createElement('div');
    item.className = 'line-item';
    item.innerHTML = `<p class="description description--debt">${desc}</p>
    <p class="cost cost--debt">\$${amnt}</p>
    <p class="trash">X</p>`;
    document.querySelector('.expenses').appendChild(item);
  }
};


//Load difference + Load Lists
window.onload = () => {
  getStg();
  document.querySelector('.amnt').innerHTML = vcontrol.diff();
};

//Control user input
document.addEventListener('keypress', (evt) => {
  const vType = document.querySelector('#income-type').value;
  const desc = document.querySelector('.form__input--desc').value;
  const amnt = parseInt(document.querySelector('.form__input--value').value, 10);
  if (evt.keyCode === 13) {
    if (vType === '' || desc === '' || amnt === '') {
      alert('Please ensure you\'ve entered valid values for each item');
    } else {
      console.log(`Positive or negative? ${vType} and the desc is ${desc} and the amount is ${amnt}`);
      modList(vType, desc, amnt);
      setStg(vType);
      document.querySelector('.amnt').innerHTML = vcontrol.diff();
    }
  }
});


const intv = setInterval(() => {
  if (document.querySelectorAll('.trash').length > 0) {
    clearInterval(intv);
    //If user opts to delete item
    document.querySelectorAll('.trash').forEach(function (evt, index) {
      evt.addEventListener('mousedown', function (el) {
        this.parentElement.remove();
      });
    });
  }
}, 2000);




