//Event Listener Form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  //Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;
  
  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  
  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

//re-fetch bookmarks
fetchBookmarks();

//Prevent form from submitting
e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url) {
  //Get bookmaks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  //Reset back to LocalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
  //re-fetch bookmarks
  fetchBookmarks();
}

//Fetch Bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));  
  var bookmarksResults = document.getElementById('bookmarksResults');
  
  
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    
    
    bookmarksResults.innerHTML += '<div class="well"</div>'+
                                  '<h3>'+name+
                                    '<a class="button" target="_blank" href="'+url+'">Visit</a>'+
                                    '<a onClick="deleteBookmark(\''+url+'\')" class="button danger" href="#">Delete</a>'+
                                  '</h3>'+
                                  '</div>';
      ;
  }
}