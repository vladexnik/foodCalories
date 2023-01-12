//window.addEventListener('DOMContentLoaded', ()=>{

    let tabs=document.querySelectorAll('.tabheader__item'),
        tabsContent=document.querySelectorAll('.tabcontent'),
        tabsParent=document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach((item)=>{
           // item.style.display="none";
            item.classList.add('hide');
            item.classList.remove('show','fade');

        });

        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active');
        });
    }
    
    
    function showTabContent(i=1){
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        //tabsContent[i].style.display='block';
        
        tabs[i].classList.add('tabheader__item_active');

    }
    hideTabContent();
    showTabContent();

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
//})