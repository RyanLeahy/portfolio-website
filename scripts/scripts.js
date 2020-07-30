function isElementInViewport (el) 
{
    var rect = el[0].getBoundingClientRect();
    console.log(el[0].clientHeight)
    return (
        rect.top >= -el[0].clientHeight &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function changeNavPos()
{
    var titlebarOnScreen = isElementInViewport(document.getElementsByClassName("titlebar"));
    var navElement;

    if(titlebarOnScreen)
    {
        navElement = document.getElementsByClassName("navfixed")[0];

        if(navElement != null)
        {
            navElement.classList.remove("navfixed");
            navElement.classList.add("nav")
        }   
    }
    else
    {
        navElement = document.getElementsByClassName("nav")[0];

        if(navElement != null)
        {
            navElement.classList.remove("nav");
            navElement.classList.add("navfixed")
        }   
    }
}

function test()
{
}