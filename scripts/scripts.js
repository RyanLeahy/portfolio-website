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
    highlightSectionLink(); //checks which section is currently in the viewport to highlight the corresponding link in the nav bar
}

//function handles highlighting the link for the section currently being displayed in the viewport
function highlightSectionLink()
{
    var titlebar = document.getElementById("titlebar") //need to know if titlebar is on screen
    var titlebarOnScreen = isElementPartiallyInViewport(titlebar, 0);

    var aboutmecontainer = document.getElementById("aboutmecontainer") //need to know if aboutmecontainer is still on screen
    var aboutmeOnScreen = isElementPartiallyInViewport(aboutmecontainer, 35);

    var aboutmelink = document.getElementsByClassName("navlinks")[0]; //get the nav links that may be highlighted
    var portfoliolink = document.getElementsByClassName("navlinks")[1];

    if(titlebarOnScreen) //if the titlebar is on screen neither links should be highlighted
    {
        aboutmelink.id = "";
        portfoliolink.id = "";
    }
    else //if you get here it means the titlebar is not on the screen and we can check what section we're looking at
    {
        if(aboutmeOnScreen) //if the about me section is on screen 
        {
            aboutmelink.id = "aboutmelink"; //apply the id to the about me link that will highlight it
            portfoliolink.id = "";
        }
        else //if here that means we're looking at the portfolio
        {
            aboutmelink.id = "";
            portfoliolink.id = "portfoliolink"; //so highlight the portfolio by applying an id
        }
    }
}