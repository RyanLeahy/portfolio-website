function isElementInViewport(el, heightParam) 
{
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= heightParam &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isElementPartiallyInViewport(el, heightParam)
{
    
    var rect = el.getBoundingClientRect();
    return (
        rect.bottom >= heightParam && 
        rect.top < (window.innerHeight || document.documentElement.clientHeight)
    );
}

function changeNavPos()
{
    var titlebar = document.getElementsByClassName("titlebar")[0];
    var titlebarOnScreen = isElementInViewport(titlebar, -titlebar.clientHeight);

    var navElement;
    
    var mainContainer = document.getElementsByClassName("maincontainer")[0];

    if(titlebarOnScreen)
    {
        navElement = document.getElementsByClassName("navfixed")[0];

        if(navElement != null)
        {
            navElement.classList.remove("navfixed");
            navElement.classList.add("nav")
            mainContainer.style.top = "35px";
        }   
    }
    else
    {
        navElement = document.getElementsByClassName("nav")[0];

        if(navElement != null)
        {
            navElement.classList.remove("nav");
            navElement.classList.add("navfixed")
            mainContainer.style.top = "70px";
        }   
    }
}

function onScroll()
{
    changeNavPos();
    highlightSectionLink();
}

function highlightSectionLink()
{
    var titlebar = document.getElementsByClassName("titlebar")[0]
    var titlebarOnScreen = isElementInViewport(titlebar, -titlebar.clientHeight);

    var aboutmecontainer = document.getElementById("aboutmecontainer")
    var aboutmeOnScreen = isElementPartiallyInViewport(aboutmecontainer, 35);

    var aboutmelink = document.getElementsByClassName("navlinks")[0];
    var portfoliolink = document.getElementsByClassName("navlinks")[1];

    if(titlebarOnScreen)
    {
        aboutmelink.id = "";
        portfoliolink.id = "";
    }
    else
    {
        if(aboutmeOnScreen)
        {
            aboutmelink.id = "aboutmelink";
            portfoliolink.id = "";
        }
        else
        {
            aboutmelink.id = "";
            portfoliolink.id = "portfoliolink";
        }
    }
}