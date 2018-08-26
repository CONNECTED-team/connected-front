$("input[type='checkbox']").click(function(event){
  event.stopPropagation();
});

$("#subjects-drop-btn + .dropdown-menu li.dropdown-item").click(function(event){
  event.stopPropagation();
  $(this).children().prop("checked") ? $(this).children().prop("checked", false) : $(this).children().prop("checked", true);
});
$("#prices-drop-btn + .dropdown-menu li.dropdown-item").click(function(event){
  event.stopPropagation();
  $(this).children().prop("checked") ? $(this).children().prop("checked", false) : $(this).children().prop("checked", true);
});

$("#gs-drop .dropdown-item, #prices-drop-btn + .dropdown-menu .dropdown-item").click(function(){
    var p = this.parentElement.previousElementSibling.attributes[2].value;
    var data = this.parentElement.previousElementSibling.dataset;
    $(`#${p}`).text($(this).text());
    $(`#${p}`).dropdown();
    if(data.price == undefined){
      $(`#${p}`).attr("data-grade", $(this).attr("data-grade"));
    }else if (data.grade == undefined){

      $(`#${p}`).attr("data-price", this.children[0].value);
      console.log(p);
    }
});

$("#gs-drop-btn").click(function(){
  $("#gs-drop-btn + ul").dropdown();
});

$("#clear-btn").click(function(){
  // Clear grades
  $("#gs-drop-btn").text("Grade");
  $("#gs-drop-btn").attr("data-grade",'');
  // Clear prices
  $("#prices-drop-btn").attr("data-price",'');
  $("#prices-drop-btn").text("Price ");
  $("#prices-drop-btn + .dropdown-menu,#subjects-drop-btn + .dropdown-menu").find("li.dropdown-item > input:checked").each(function(i,val){
    val.checked = false;
  });
  // show all cards
  $(document).find(".teacher-card").each(function(i,val){
    val.style.display = "block";
  });
});

// Clicking the filter button
$("#filter-btn").click(function(){

  $(document).find(`.teacher-card`).each(function(i,theCard){
    theCard.dataset.select = 0;
  });

  var prices = [100,150,200,250,300,350,400,450,500];
  let subjects = [];
  let price = [];
  price[0] = $("#prices-drop-btn").attr("data-price");
  console.log(price[0]);
  let grade = $("#gs-drop-btn").attr("data-grade");

  // Counts number of "Selected" classes
  let select_counter = 0;
  // number of teacher cards
  const cards = $(document).find(".teacher-card").length;

  // Get checked subjects
  $("#subjects-drop-btn + .dropdown-menu").find("li.dropdown-item > input:checked").each(function(index,value){
    subjects[index] = value.attributes[1].value
  });


if(price[0]){
  // Include low prices
  for(var i = 0;i<prices.length;i++){
    if(prices[i] < price[0]){
      price[i+1] = prices[i];
    }
  }
}

if (subjects.length > 0){
    select_counter++;
     console.log(`Subject: ${select_counter}`);
    // first select teachers upon what they teach
    for(var i=0;i<(subjects.length);i++){
      $(document).find(`.teacher-card a[data-subjects~=${subjects[i]}]`).each(function(i,by_subject){
        var id = by_subject.parentElement.parentElement.parentElement;
        id.dataset.select++;
      })
    }
}

if (grade !== ''){
  select_counter++;
   console.log(`grade: ${select_counter}`);
  // go through the cards if it matches up color it otherwise hide the card
  $(document).find(`.teacher-card a[data-grade~='${grade}']`).each(function(i,by_grade){
    // Match up the Prices by getting value from sibling
    var id = by_grade.parentElement.parentElement.parentElement;
    id.dataset.select++;
  });
}

if(price[0]){
 select_counter++;
 console.log(`price: ${select_counter}`);
 console.log(select_counter);
  for(var i = 0;i<price.length;i++){
    $(document).find(`.teacher-card a[data-price~='${price[i]}']`).each(function(i,by_price){
      var id = by_price.parentElement.parentElement.parentElement;
      id.dataset.select++;
    });
  }
}

$(document).find(".teacher-card").each(function(i,theCard){
    if(theCard.dataset.select != select_counter){
      theCard.style.display = 'none';
    }else{
      theCard.style.display = 'block';
      // Selected cards count
      console.log(theCard.dataset.select);
    }
  });
  console.log(select_counter);

});
