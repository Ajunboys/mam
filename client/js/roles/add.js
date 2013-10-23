$("#btn-add").click(function() {
	
	$( 'form').parsley( 'validate' );	
	if(!$('form').parsley('isValid')){
		noty({
				text : 'Input validation failed!',
				'layout' : 'center',
				'type' : 'error'
		});		
		return;
	}
	

	var name = $('#inputName').val();
	var type = $('#inputType').val();
	var users = $('#inputUsers').val();
	var tenantId = $('#tenantId').val();

	var usersArray = []
	if (users != null) {
		usersArray = users.toString().split(",");
	}
	// alert(JSON.stringify(userGroupsArray));
	jso = {
		"tenant_id" : tenantId,
		"name" : name,
		"type" : type,
		"users" : usersArray
	};

	

	jQuery.ajax({
		url : getServiceURLs("groupsCRUD", ""),
		type : "POST",		
		data : JSON.stringify(jso),
		contentType : "application/json",
     	dataType : "json",
     	statusCode: {
			400: function() {
				noty({
					text : 'Error occured!',
					'layout' : 'center',
					'type': 'error'
				});
			},
			404: function() {
				noty({
					text : 'API not found!',
					'layout' : 'center',
					'type': 'error'
				});
			},
			500: function() {
				noty({
					text : 'Fatal error occured!',
					'layout' : 'center',
					'type': 'error'
				});
			},
			201: function() {
				noty({
					text : 'Group Added successfully!',
					'layout' : 'center'
				});
				window.location.assign("configuration");
			},
			409: function() {
				noty({
					text : 'Group already exist!',
					'layout' : 'center',
					'type': 'error'
				});				
			}
		}			
	});
	
	
	

});


$( ".radioGroupType" ).change(function() {
	var value = $(this).val();	
	$(".box1 .filter").val(value);	
	$(".box1 .filter" ).change();
});


$( document ).ready(function() {
	var value = 'user';	
	$(".box1 .filter").val(value);	
	$(".box1 .filter" ).change();
});