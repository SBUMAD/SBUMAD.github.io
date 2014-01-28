$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$( document ).ready(function() {
	// This script sets OSName variable as follows:
	// "Windows"    for all versions of Windows
	// "MacOS"      for all versions of Macintosh OS
	// "Linux"      for all versions of Linux

	if (navigator.appVersion.indexOf("Win")!=-1) $('#myTab Windows').tab('show');
	if (navigator.appVersion.indexOf("Mac")!=-1) $('#myTab Mac').tab('show');
	if (navigator.appVersion.indexOf("Linux")!=-1) $('#myTab Linux').tab('show');

});