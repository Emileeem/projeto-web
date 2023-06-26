
function toggleMenu(){
    const menuMobile = document.getElementById("menu-mobile")

    if(menuMobile.className === "menu-mobile-active"){
        menuMobile.className = "menu-mobile"
    }
    else{
        menuMobile.className = "menu-mobile-active"
    }
}

function fechaMenu(){
    const menu = document.getElementById("menu")

    if(menu.className === "button-sidebar-active"){
        menu.className = "button-sidebar"
    }
    else{
        menu.className = "button-sidebar-active"
    }
}