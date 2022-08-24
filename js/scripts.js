'use strict'

// CONSTANTES INICIAIS 

const $chartColumnContent = document.querySelectorAll('.chartColumnContent');
const $chartDay = document.querySelectorAll('.chartDay');
const $label = document.querySelectorAll('.label');
const $name = document.querySelector('.name');

//------------------------------------------------------------------------------------------------------------------------------------------------//

// FUNÇÃO PRINCIPAL QUE UTILIZA O JSON

dataChart();

async function dataChart () {
    const url = await fetch('./data.json');
    const data = await url.json();
    
    const daysWeek = data.map(data => data.day);
    const valuesDay = data.map(data => data.amount);


    $chartDay.forEach((el, index) => {
        el.textContent = daysWeek[index]
    });

    $chartColumnContent.forEach((column, index) => {
        column.style.height = `${valuesDay[index] * 2.90}px`
    });

    $label.forEach((lb, index) => {
        lb.textContent = `$${valuesDay[index]}`
    });
    
}


//------------------------------------------------------------------------------------------------------------------------------------------------//

//FUNÇÕES QUE ADICIONA OU REMOVE A CLASSE SHOW NO LABEL DO VALOR DA BARRA E DO CLIQUE QUE DETERMINA A BARRA A SER DESTACADA



for (let i = 0; i < $chartColumnContent.length; i++) {
    $chartColumnContent[i].addEventListener("click", handleClick);
    $chartColumnContent[i].addEventListener('mouseover', (e) => {
        e.target.querySelector('.label').classList.add('show')
        
    });

    $chartColumnContent[i].addEventListener('mouseout', (e) => {
        e.target.querySelector('.label').classList.remove('show');
  
    });
}



function handleClick (e) {
    for (let x = 0; x < $chartColumnContent.length; x++) {
        $chartColumnContent[x].classList.remove('clicked');
        // label[x].classList.remove('show')
    }

    e.target.classList.add('clicked');
    // e.target.querySelector('.label').classList.add('show')
}



//------------------------------------------------------------------------------------------------------------------------------------------------//

// FUNÇÃO DO GIF DA MINHA ASSINATURA FAKE


$name.addEventListener('mouseover', () => {
    const $myFakeSignature = document.querySelector('.myFakeSignature');
    // myFakeSignature.style.display = 'block'
    $myFakeSignature.classList.add('show')

})

$name.addEventListener('mouseout', () => {
    const $myFakeSignature = document.querySelector('.myFakeSignature');
    // myFakeSignature.style.display = 'none'
    $myFakeSignature.classList.remove('show')


})

//------------------------------------------------------------------------------------------------------------------------------------------------//


// FUNÇÃO QUE DETERMINA DINAMICAMENTE O DIA ATUAL E FAZ COM QUE A BARRA DO GRAFICO FIQUE DESTACADA

function getDayActual () {
    const dateActual = new Date();
    const day =  dateActual.getDay();
    
    $chartColumnContent.forEach(element => {
        if (parseInt(element.getAttribute('data-id'))  === day) {
            element.classList.add('clicked');
        }
    });    
}

getDayActual();