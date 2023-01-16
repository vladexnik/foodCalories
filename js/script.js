//window.addEventListener('DOMContentLoaded', ()=>{
    //Tabs
    let tabs=document.querySelectorAll('.tabheader__item'),
        tabsContent=document.querySelectorAll('.tabcontent'),
        tabsParent=document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach((item)=>{

           // item.style.display="none"; // ниже исп css классы
            item.classList.add('hide');
            item.classList.remove('show','fade');

        });

        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active');
        });
    }
    
    
    function showTabContent(i=1){

        //tabsContent[i].style.display='block'; // ниже исп css классы
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        
        tabs[i].classList.add('tabheader__item_active');

    }
    hideTabContent();
    showTabContent();

    // обработчик события на клик
    tabsParent.addEventListener('click', (event)=>{
        let target=event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, index)=>{
                if(target == item){
                    hideTabContent();
                      showTabContent(index);
                }
            })
        }

    })



    //Timer

    let deadline='2023-02-16';
    function getTimeRemaining(endtime){ // считает время
        let t=Date.parse(endtime)-new Date();// in ms
        let days=Math.floor(t/(1000*3600*24)),
            hours=Math.floor((t/(1000*60*60))%24),
            minutes=Math.floor((t/(1000*60))%60),
            seconds=Math.round((t/1000)%60);
       // return console.log(days,hours,minutes,seconds)
        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }; // ниже используются свойства 
    }

    function getZero(num){ // подставлять нолик когда однозначное число
        if(num>=0 && num<10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime){
        let timer=document.querySelector(selector);// ('.timer)
            days=timer.querySelector('#days'),
            hours=timer.querySelector('#hours'),
            minutes=timer.querySelector('#minutes'),
            seconds=timer.querySelector('#seconds'),
            timeInterval=setInterval(updateClock, 1000); // запускаем таймер каждую секунду

        updateClock();
        function updateClock(){  
            let t=getTimeRemaining(endtime); // возвращаются дни часы минуты сек

            days.innerHTML=getZero(t.days);
            hours.innerHTML=getZero(t.hours);
            minutes.innerHTML=getZero(t.minutes);
            seconds.innerHTML=getZero(t.seconds);

            if(t.total<=0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline)
    
//})