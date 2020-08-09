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

//function handles the drop down navigation bar appearing and disappearing
function changeNavDisplay(navLinkClicked)
{
    var navburger = document.getElementById("navburger");
    var nav, linkcontainer, links, linkslength;

    if(navLinkClicked == true || navburger.src.includes("images/x.jpg") == true) //if either a nav link was clicked or the current nav button is an x then this click event is to close the nav
    {
        nav = document.getElementById("navdisplayed");
        linkcontainer = document.getElementById("navlinkcontainerdisplayed");
        links = document.getElementsByClassName("navlinksdisplayed");
        linkslength = links.length;

        navburger.src = "images/burger.jpg"; //change the image to a burger
        nav.id = "nav"; //get rid of the nav
        linkcontainer.id = "navlinkcontainer"; //get rid of the nav link container

        for(i = linkslength - 1; i >= 0; i--)
        {
            links[i].className = "navlinks"; //get rid of the nav links
        }
    }
    else
    {
        nav = document.getElementById("nav");
        linkcontainer = document.getElementById("navlinkcontainer");
        links = document.getElementsByClassName("navlinks");
        linkslength = links.length;

        navburger.src = "images/x.jpg"; //change the image to an x
        nav.id = "navdisplayed"; //display the nav
        linkcontainer.id = "navlinkcontainerdisplayed"; //display the container
        
        for(i = linkslength - 1; i >= 0; i--)
        {
            links[i].className = "navlinksdisplayed"; //display the links
        }
    }
}

//functions purpose is to reset the navigation menu from being open to closed if a resize event happens just in case the stylesheets switch from mobile to desktop
function resetChangesOnResize()
{
    nav = document.getElementById("navdisplayed");
    linkcontainer = document.getElementById("navlinkcontainerdisplayed");
    links = document.getElementsByClassName("navlinksdisplayed");
    linkslength = links.length;


    if(nav != null)
    {
        navburger.src = "images/burger.jpg"; //change the image to a burger
        nav.id = "nav"; //get rid of the nav
        linkcontainer.id = "navlinkcontainer"; //get rid of the nav link container

        for(i = linkslength - 1; i >= 0; i--)
        {
            links[i].className = "navlinks"; //get rid of the nav links
        }
    }
}

//adds or removes a delay to the about me and portfolio link on the home page depending on if its mobile or not
function changeDelay()
{
    if(window.innerWidth > 510 || document.documentElement.clientWidth > 510) //if the window width is more than 510px then it loads the desktop css so link delays should not be implemented because there is no overshoot problem
        removeDelay();
    else //otherwise the window has loaded mobile and a delay is necessary to not cause the about me and portfolio links to overshoot due to the transition duration of the nav menu closing
        addDelay();
}

//adds a delay to opening a link for about me and portfolio to allow the nav menu to close so no overshooting occurs
function addDelay()
{
    var aboutmelink;
    var portfoliolink;
    
    aboutmelink = document.getElementsByClassName("navlinks")[0];
    portfoliolink = document.getElementsByClassName("navlinks")[1];
    

    aboutmelink.href = "javascript:delay('#aboutme')";
    portfoliolink.href = "javascript:delay('#portfolio')";
}

//removes the delay when switching to desktop mode because it's unnecessary since the overshoot is caused by the nav menu opening and closing which does not occur on desktop
function removeDelay()
{
    var aboutmelink = document.getElementsByClassName("navlinks")[0];
    var portfoliolink = document.getElementsByClassName("navlinks")[1];
    
    aboutmelink.href = "#aboutme";
    portfoliolink.href = "#portfolio";
}

//the function that actually does the delaying. Delays opening links by 250ms
function delay(URL)
{
    setTimeout(function() {window.location = URL}, 250);
}

//entrypoint function for an onscroll event
function onScroll()
{
    if(window.innerWidth > 510 || document.documentElement.clientWidth > 510) //if the window width is more than 510px then it loads the desktop css where the nav menu should be snapped to the top
        changeNavPos(); //checks if the nav bar should be snapped to the top of the screen
}

//function handles click events from inputs and links
function onClick(navLinkClicked)
{
    if(window.innerWidth <= 510 || document.documentElement.clientWidth <= 510) //if the window width is less than or equal to 510px than the mobile css is loaded and nav display can be modified
        changeNavDisplay(navLinkClicked); //changes if the navigation should appear or not
}

function onResize()
{
    resetChangesOnResize();
    changeDelay();
}

function onLoad()
{
    changeDelay();
}