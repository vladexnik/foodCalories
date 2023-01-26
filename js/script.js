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
    let deadline='2022-02-16';
    function getTimeRemaining(endtime){ // считает время
        let t=Date.parse(endtime)-new Date();// in ms
        let days, hours, minutes, seconds;
        if(t<=0){
            days=0, hours=0, minutes=0, seconds=0;
        }
        else {
            days=Math.floor(t/(1000*3600*24)),
            hours=Math.floor((t/(1000*60*60))%24),
            minutes=Math.floor((t/(1000*60))%60),
            seconds=Math.round((t/1000)%60); 
        }
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
    

    //Modal
      let modalTrigger=document.querySelectorAll('[data-modal]'),
          modal=document.querySelector('.modal'),
          modalCloseBtn=document.querySelector('[data-close]');
    
    function openModal() {
        modal.classList.toggle('show');
        //     modal.classList.add('show');
        //     modal.classList.remove('hide');
            document.body.style.overflow='hidden'; // чтобы не листать страницу пока мы в модальном окне
        // clearInterval(modalTimerId);
    }

    function closeModal(){
        modal.classList.toggle('show')
        // modal.classList.add('hide');
        // modal.classList.remove('show');
        document.body.style.overflow=''; // default
    }
    modalTrigger.forEach(btn =>{
        btn.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click',closeModal);

    modal.addEventListener('click',(event)=>{ // выход из модального окна по щелчку вне его
        if (event.target === modal ){
            closeModal();
        }
    })

    document.addEventListener('keydown',(e)=>{  // выход по ESC 
        if (e.code==='Escape' && modal.classList.contains('show')){
            modal.classList.toggle('show');
            document.body.style.overflow='';
        }
    })


    //Additional Modal Functions
    
  // let modalTimerId=setInterval(openModal,4000)
  
    
    function scrollModal(){  
           // console.log( 'Текущая прокрутка сверху: ' + window.pageYOffset +' '+ document.documentElement.scrollHeight +' '+ document.documentElement.clientHeight );
            if(window.pageYOffset+document.documentElement.clientHeight >= 
                document.documentElement.scrollHeight) //
            { openModal();
            window.removeEventListener('scroll', scrollModal) // после выполенеия функции удаляем обработчик  
            } 
        }
    window.addEventListener('scroll',scrollModal); 
    
// add new El
class Menu{
    constructor(src, alt,title, descr, price,parentSelector, ...classes){
        this.src=src;
        this.alt=alt;
        this.title=title;
        this.descr=descr;
        this.price=price;
        this.classes=classes; // array
        this.parent=document.querySelector(parentSelector)
        this.transfer=10;
        this.convertToBlr()
    }

    convertToBlr(){
        this.price=Math.floor(this.price*this.transfer);
        
    }
    render(){
        let element=document.createElement('div');

        if(this.classes.length===0){
            this.element='menu__item';
            element.classList.add();
        }
        else{
            this.classes.forEach(className=> element.classList.add(className));
        }
            element.innerHTML=`
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`;
        this.parent.append(element);
        }
    }

// let div=new Menu();
// div.render();

new Menu(
    "img/tabs/arbuz.jpg",
    "arbuz is here",
    "Меню - арбуз", 
    "Сочный сладкий кусочек блаженства в жаркий летний вечер, который подогреет атмосферу в любом удобном для вас месте. Отлично сочтается с бананом", 
    12,
    '.menu .container',
    'menu__item').render();
new Menu(
    "img/tabs/vegy.jpg",
    "arbuz is here",
    "Меню - арбуз", 
    "Сочный сладкий кусочек блаженства в жаркий летний вечер, который подогреет атмосферу в любом удобном для вас месте. Отлично сочтается с бананом", 
    12,
    '.menu .container',
    'menu__item',
    'big').render();


    //forms
    let forms=document.querySelectorAll('form');
    let message={
        loading: 'Загрузка',
        success: 'Мы с вами свяжемся',
        failure: 'Сбой произошёл...'
    };
    forms.forEach(item=>{
        postData(item);
    })
    

    function postData(form) {
        form.addEventListener('submit',(event)=>{
            event.preventDefault();
            
            let statusMessage=document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent=message.loading;
            form.append(statusMessage);

            let request=new XMLHttpRequest();
            request.open('POST','server.php');
           // request.setRequestHeader('Content-type', 'multipart/form-data');
            
            let formData=new FormData(form);


            let object={};
            formData.forEach((value,key)=>{
                object[key]=value;
            });

            let json=JSON.stringify(object);
            request.send(json);

            //request.send(formData); 

            request.addEventListener('load',()=>{
                if(request.status=== 200){
                    console.log(request.response);
                    statusMessage.textContent=message.success;
                    //showThanksModal(message.success);
                     // очищает поля ввода form.reset
                    form.reset();
                    setTimeout(()=>{ 
                        statusMessage.remove();
                         } , 4000);            
                }
                else {
                    console.log('bad');
                    statusMessage.textContent=message.failure;
                    //showThanksModal(message.failure);
                }
            });
        });
    }

   /* function showThanksModal(message){
        
        let prevModalDialog=document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        let thanksModal=document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
        <div class='modal__content'
            <div class='modal__close' data-close>x</div>
            <div class ='modal__title'>${message} </div>
        </div>
        >`;
       
       document.querySelector('.modal').append(thanksModal);

       setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
       },4000);
    }
*/
    


//})