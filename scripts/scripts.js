//function determines if an element is partially in the viewport
function isElementPartiallyInViewport(el, heightParam)
{
    
    var rect = el.getBoundingClientRect();
    return (
        rect.bottom >= heightParam && 
        rect.top < (window.innerHeight || document.documentElement.clientHeight)
    );
}

//function determines if the nav bar should be snapped to the top of the viewport and does the work to make it happen
function changeNavPos()
{
    var titlebar = document.getElementById("titlebar"); //grab the element with the id title bar and save its reference
    var titlebarOnScreen = isElementPartiallyInViewport(titlebar, 0); //check if the titlebar is still on the screen

    var navElement; //declaration of navElement reference. Can't initialize it because its class name differs depending on if its already snapped or not
    
    var mainContainer = document.getElementById("maincontainer"); //need the main container to adjust its spacing from the nav bar
    if(titlebarOnScreen) //if the titlebar is on the screen we need to make the nav no longer fixed to the top of the viewport
    {
        navElement = document.getElementById("navfixed");

        if(navElement != null)
        {
            navElement.id = "nav";
            mainContainer.style.top = "35px"; //once it's no longer fixed to the top of the screen the relative position of the main container needs to readjust accordingly.
        }   
    }
    else
    {
        navElement = document.getElementById("nav");

        if(navElement != null)
        {
            navElement.id = "navfixed";
            mainContainer.style.top = "70px"; //once the nav snaps to the top we lose 35px to its dissapearance and to make the maincontainer not jump up when the nav snaps 35px needs to be added
        }   
    }
}

//entrypoint function for an onscroll event
function onScroll()
{
    changeNavPos(); //checks if the nav bar should be snapped to the top of the screen
}