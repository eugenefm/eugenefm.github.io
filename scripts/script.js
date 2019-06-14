
const app = {};

app.nav = () => {
  let lastId,
    topMenu = $("header"),
    topMenuHeight = topMenu.outerHeight()-10,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      let item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  e.target.blur()
  let href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  $('#burger').prop('checked', false);
  e.preventDefault();
});

// Bind to scroll
  $(window).scroll(function(){
    // Get container scroll position
    let fromTop = $(this).scrollTop()+topMenuHeight;
    
    // Get id of current scroll item
    let cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    let id = cur && cur.length ? cur[0].id : "";
    
    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href='#"+id+"']").parent().addClass("active");
    }                   
  });            
}

app.init = () =>{
  $('.expand').on('click', (e)=>{
    $('html, body').animate({
      scrollTop: $('.container').offset().top - 75
    }, '150');
    $('.portfolioItem').removeClass('expanded')
    $(e.currentTarget).parents('.portfolioItem').addClass('expanded')
    
  })
  $('.shrink').on('click', (e)=>{
    $(e.currentTarget).parents('.portfolioItem').removeClass('expanded');
  })
  
  app.nav();
  // $('#nav').simpleMenu({
  //       // options here
  //     });
}



$(function () {
  app.init();
});