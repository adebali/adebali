	
	function getUrlVars() {
                var vars = {};
                var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
                function(m,key,value) {
                vars[key] = value;
                });
                return vars;
                }
	
	//buildSlides();
	
	function twitterBoxWidth(){

	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	
		//alert("twitter box function is triggered");
		function changeWidth(){
		//alert($('iframe[id^=twitter-widget-]'));
		console.log($('iframe[id^=twitter-widget-]'));
		$('iframe[id^=twitter-widget-]').each(function () {
			var head = $(this).contents().find('head');
			if (head.length) {
				console.log("HEADD");
				head.append('<style>.timeline { max-width: 100% !important; width: 100% !important; } .timeline .stream { max-width: none !important; width: 100% !important; }</style>');
			}
			$('#twitter-widget-0').append($('<div class=timeline>'));
		})
		}
		
		changeWidth();
	}
	
	function switchPage(activeNum){
		$(".pages").hide();
		$("#page" + activeNum).slideDown("slow");
		
		$("#menu").remove();
		addTopBanner(activeNum);
		
		if(activeNum==0){
			buildSlides();
			twitterBoxWidth();
			}
		
		if (activeNum==1){
			
				$('a[href^="#"]').on('click',function (e) {
					e.preventDefault();

					var target = this.hash;
					var $target = $(target);

					$('html, body').stop().animate({
						'scrollTop': $target.offset().top
					}, 900, 'swing', function () {
						window.location.hash = target;
					});
				});
	
		}
		
		if (activeNum==2){
			load_js("js/main.js");
		}
	}
	
	
	 function load_js(file)
   {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src= file;
      head.appendChild(script);
   }
	  
		function addTopBanner(activeNum){
			$("#menu").remove();
			
			function activeNum2menuClass(activeNum,menuNum){
				if(activeNum==menuNum){
					result = "currentMenu"}
				else{
					result = "inactiveMenu"}
				return result;
				}

					$("#topbanner").append(
					[
					"<ul id='menu' class='nav navbar-nav'>",
						"<li><label><a class='" + activeNum2menuClass(activeNum,0) + " toplayer next' href='#' onClick=\"switchPage(0)\">Home</a></label></li>",
						"<li id='resumeButton'>",
							"<label><a class='" + activeNum2menuClass(activeNum,1) + " toplayer' href='#' onClick=\"switchPage(1)\">Resume</a></label>",
						"</li>",
							"<label><a class='" + activeNum2menuClass(activeNum,2) + " toplayer' href='#' onClick=\"switchPage(2)\">My Story</a></label>",
						"</li>",
						"<li><label><a class='" + activeNum2menuClass(activeNum,3) + " toplayer next' href='#' onClick=\"switchPage(3)\">Research</a></label></li>",
						"<li><label><a class='" + activeNum2menuClass(activeNum,4) + " toplayer next' href='#' onClick=\"switchPage(4)\">Services</a></label></li>",
						"<li><label><a class='" + activeNum2menuClass(activeNum,5) + " toplayer next' href='#' onClick=\"switchPage(5)\">Workbench</a></label></li>",
						//"<li><label><a class='" + activeNum2menuClass(activeNum,6) + " toplayer next' href='#' onClick=\"switchPage(6)\">Blog</a></label></li>",
					"</ul>"
					].join('\n'));
					
					if (activeNum==1){
						$("#resumeButton").append([
						"<ul id='sub1'>",
							"<li><a class='submenu' href='#about'><i class= 'fa fa-user left'></i> About</a></li>",
							"<li><a class='submenu' href='#education'><br><i class= 'fa fa-graduation-cap left'></i> Education</a></li>",
							"<li><a class='submenu' href='#work'><br><i class= 'fa fa-suitcase left'></i> Work</a></li>",
							"<li><a class='submenu' href='#publications'><br><i class= 'fa fa-book left'></i> Publications</a></li>",
							"<li><a class='submenu' href='#awards'><br><i class= 'fa fa-trophy left'></i> Awards&Honors</a></li>",
							"<li><a class='submenu' href='#conferences'><br><i class='fa fa-exchange left'></i> Conferences</a></li>",
							"<li><a class='submenu' href='#workshops'><br><i class='fa fa-pencil-square-o left'></i> Workhops</a></li>",
							"<li><a class='submenu' href='#press'><br><i class= 'fa fa-address-card left'></i> Duties</a></li>",
							"<li><a class='submenu' href='#press'><br><i class= 'fa fa-newspaper-o left'></i> Press</a></li>",
							"<li><a class='submenu' href='#skills'><br><i class= 'fa fa-tasks left'></i> Skills</a></li>",
							"<li><a class='submenu' href='#languages'><br><i class= 'fa fa-language left'></i> Languages</a></li>",
							"<li><a class='submenu' href='#references'><br><i class= 'fa fa-thumbs-up left'></i> References</a></li>",
							"<li><a class='submenu' href='#interests'><br><i class= 'fa fa-star left'></i> Social Life</a></li>",
						"</ul>"].join('\n'));
					}
				}
			
			

//	$(document).ready(function(){
	//   $.getJSON('resume.json', function(data) {
		$.get('body.template.html', function(template) {
			var resumeObject = resumeData; 
			
				var d = new Date();
				var curyear = d.getFullYear();
				resumeObject.basics.capitalName = (resumeObject.basics.name).toUpperCase();
				resumeObject.basics.capitalLabel = (resumeObject.basics.label).toUpperCase();


				//resumeObject.basics.date = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear();
				resumeObject.basics.year = d.getFullYear();



					resumeObject.dateBool = true;
					
					if (resumeObject.basics.email) {
						resumeObject.emailBool = true;
					}

					if (resumeObject.basics.phone) {
						resumeObject.phoneBool = true;
					}

					if (resumeObject.basics.picture) {
						resumeObject.pictureBool = true;
					}

					if (resumeObject.basics.website) {
						resumeObject.websiteBool = true;
					}

					if (resumeObject.basics.summary) {
						resumeObject.aboutBool = true;
					}

					if (resumeObject.basics.profiles) {
						if (resumeObject.basics.profiles[0].network) {
							_.each(resumeObject.basics.profiles, function(w){
								if ((w.network == 'Twitter' || w.network == 'twitter') && w.url == '' && w.username != '') {
									w.url = "https://twitter.com/" + w.username;
								}
								if ((w.network == 'facebook' || w.network == 'Facebook' || w.network == 'FaceBook') && w.url == '' && w.username != '') {
									w.url = "https://facebook.com/" + w.username;
								}
								if ((w.network == 'Linkedin' || w.network == 'linkedin' || w.network == 'LinkedIn') && w.url == '' && w.username != '') {
									w.url = "https://linkedin.com/in/" + w.username;
								}
							});
						}
					}

					if (resumeObject.work) {
						if (resumeObject.work[0].company) {
							resumeObject.workBool = true;
							_.each(resumeObject.work, function(w){
								if (w.startDate) {
									w.startDateYear = (w.startDate || "").substr(0,4);
									switch (w.startDate.substr(5,2)) {
										case '01':
											w.startDateMonth = "January ";
											break;
										case '02':
											w.startDateMonth = "February ";
											break;
										case '03':
											w.startDateMonth = "March ";
											break;
										case '04':
											w.startDateMonth = "April ";
											break;
										case '05':
											w.startDateMonth = "May ";
											break;
										case '06':
											w.startDateMonth = "June ";
											break;
										case '07':
											w.startDateMonth = "July ";
											break;
										case '08':
											w.startDateMonth = "August ";
											break;
										case '09':
											w.startDateMonth = "September ";
											break;
										case '10': 
											w.startDateMonth = "October ";
											break;
										case '11':
											w.startDateMonth = "November ";
											break;
										case '12':
											w.startDateMonth = "December ";
											break;
										}
								}
								if(w.endDate) {
									w.endDateYear = (w.endDate || "").substr(0,4);
									switch ((w.endDate || "").substr(5,2)) {
										case '01':
											w.endDateMonth = "January ";
											break;
										case '02':
											w.endDateMonth = "February ";
											break;
										case '03':
											w.endDateMonth = "March ";
											break;
										case '04':
											w.endDateMonth = "April ";
											break;
										case '05':
											w.endDateMonth = "May ";
											break;
										case '06':
											w.endDateMonth = "June ";
											break;
										case '07':
											w.endDateMonth = "July ";
											break;
										case '08':
											w.endDateMonth = "August ";
											break;
										case '09':
											w.endDateMonth = "September ";
											break;
										case '10': 
											w.endDateMonth = "October ";
											break;
										case '11':
											w.endDateMonth = "November ";
											break;
										case '12':
											w.endDateMonth = "December ";
											break;
										}
								} else { 
									w.endDateYear = 'Present'
								}
								if (w.highlights) {
									if (w.highlights[0]) {
										if (w.highlights[0] != "") {
											w.workHighlights = true;
										}
									}
								}
								if (w.labs) {
									if (w.labs[0]) {
										if (w.labs[0] != '') {
											w.labsBool = true
										}

										if ((w.labs.length) > 1) {
											w.multiLab = true
										}
									}
								}
							});
						}
					}

					if (resumeObject.education) {
						if (resumeObject.education[0].institution) {
							resumeObject.educationBool = true;
							_.each(resumeObject.education, function(e){
								if( !e.area || !e.studyType ){
								  e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
								} else {
								  e.educationDetail = e.area + ", "+ e.studyType;
								}
								if (e.gpa) {
									e.gpaBool = true;
								}
								if (e.startDate) {
									e.startDateYear = e.startDate.substr(0,4);
									switch (e.startDate.substr(5,2)) {
										case '01':
											e.startDateMonth = "January ";
											break;
										case '02':
											e.startDateMonth = "February ";
											break;
										case '03':
											e.startDateMonth = "March ";
											break;
										case '04':
											e.startDateMonth = "April ";
											break;
										case '05':
											e.startDateMonth = "May ";
											break;
										case '06':
											e.startDateMonth = "June ";
											break;
										case '07':
											e.startDateMonth = "July ";
											break;
										case '08':
											e.startDateMonth = "August ";
											break;
										case '09':
											e.startDateMonth = "September ";
											break;
										case '10': 
											e.startDateMonth = "October ";
											break;
										case '11':
											e.startDateMonth = "November ";
											break;
										case '12':
											e.startDateMonth = "December ";
											break;
									}
								} else {
									e.endDateMonth = "";
								}
								if (e.endDate) {
									e.endDateYear = e.endDate.substr(0,4);
									switch (e.endDate.substr(5,2)) {
										case '01':
											e.endDateMonth = "January ";
											break;
										case '02':
											e.endDateMonth = "February ";
											break;
										case '03':
											e.endDateMonth = "March ";
											break;
										case '04':
											e.endDateMonth = "April ";
											break;
										case '05':
											e.endDateMonth = "May ";
											break;
										case '06':
											e.endDateMonth = "June ";
											break;
										case '07':
											e.endDateMonth = "July ";
											break;
										case '08':
											e.endDateMonth = "August ";
											break;
										case '09':
											e.endDateMonth = "September ";
											break;
										case '10': 
											e.endDateMonth = "October ";
											break;
										case '11':
											e.endDateMonth = "November ";
											break;
										case '12':
											e.endDateMonth = "December ";
											break;
									}
									if (e.endDateYear > curyear) {
										e.endDateYear += " (expected)";
									}
								} else { 
									e.endDateYear = 'Present'
									e.endDateMonth = '';
								}
								if (e.courses) {
									if (e.courses[0]) {
										if (e.courses[0] != "") {
											e.educationCourses = true;
										}
									}
								}
							});
						}
					}

					if (resumeObject.awards) {
						if (resumeObject.awards[0].title) {
							resumeObject.awardsBool = true;
							_.each(resumeObject.awards, function(a){
								a.year = (a.date || "").substr(0,4);
								a.day = (a.date || "").substr(8,2);
								switch ((a.date || "").substr(5,2)) {
									case '01':
										a.month = "January";
										break;
									case '02':
										a.month = "February";
										break;
									case '03':
										a.month = "March";
										break;
									case '04':
										a.month = "April";
										break;
									case '05':
										a.month = "May";
										break;
									case '06':
										a.month = "June";
										break;
									case '07':
										a.month = "July";
										break;
									case '08':
										a.month = "August";
										break;
									case '09':
										a.month = "September";
										break;
									case '10': 
										a.month = "October";
										break;
									case '11':
										a.month = "November";
										break;
									case '12':
										a.month = "December";
										break;
								}
							});
						}
					}

					if (resumeObject.conferences) {
						if (resumeObject.conferences[0].title) {
							resumeObject.conferencesBool = true;
							_.each(resumeObject.conferences, function(a){
								a.year = (a.date || "").substr(0,4);
								a.day = (a.date || "").substr(8,2);
								switch ((a.date || "").substr(5,2)) {
									case '01':
										a.month = "January";
										break;
									case '02':
										a.month = "February";
										break;
									case '03':
										a.month = "March";
										break;
									case '04':
										a.month = "April";
										break;
									case '05':
										a.month = "May";
										break;
									case '06':
										a.month = "June";
										break;
									case '07':
										a.month = "July";
										break;
									case '08':
										a.month = "August";
										break;
									case '09':
										a.month = "September";
										break;
									case '10': 
										a.month = "October";
										break;
									case '11':
										a.month = "November";
										break;
									case '12':
										a.month = "December";
										break;
								}
							});
						}
					}

					
					
					if (resumeObject.workshops) {
						if (resumeObject.workshops[0].title) {
							resumeObject.workshopsBool = true;
							_.each(resumeObject.workshops, function(a){
								a.year = (a.date || "").substr(0,4);
								a.day = (a.date || "").substr(8,2);
								switch ((a.date || "").substr(5,2)) {
									case '01':
										a.month = "January";
										break;
									case '02':
										a.month = "February";
										break;
									case '03':
										a.month = "March";
										break;
									case '04':
										a.month = "April";
										break;
									case '05':
										a.month = "May";
										break;
									case '06':
										a.month = "June";
										break;
									case '07':
										a.month = "July";
										break;
									case '08':
										a.month = "August";
										break;
									case '09':
										a.month = "September";
										break;
									case '10': 
										a.month = "October";
										break;
									case '11':
										a.month = "November";
										break;
									case '12':
										a.month = "December";
										break;
								}
							});
						}
					}


					if (resumeObject.publications) {
						if (resumeObject.publications[0].name) {
							resumeObject.publicationsBool = true;
							_.each(resumeObject.publications, function(a){
								a.year = (a.releaseDate || "").substr(0,4);
								a.day = (a.releaseDate || "").substr(8,2);
								switch ((a.releaseDate || "").substr(5,2)) {
									case '01':
										a.month = "January";
										break;
									case '02':
										a.month = "February";
										break;
									case '03':
										a.month = "March";
										break;
									case '04':
										a.month = "April";
										break;
									case '05':
										a.month = "May";
										break;
									case '06':
										a.month = "June";
										break;
									case '07':
										a.month = "July";
										break;
									case '08':
										a.month = "August";
										break;
									case '09':
										a.month = "September";
										break;
									case '10': 
										a.month = "October";
										break;
									case '11':
										a.month = "November";
										break;
									case '12':
										a.month = "December";
										break;
								}
							});
						}
					}

					if (resumeObject.volunteer) {
						if (resumeObject.volunteer[0]) {
						//if (resumeObject.volunteer[0].position) {
							resumeObject.volunteerBool = true;
							_.each(resumeObject.volunteer, function(a){
								a.startDateYear = (a.startDate || "").substr(0,4);
								switch ((a.startDate || "").substr(5,2)) {
									case '01':
										a.startDateMonth = "January ";
										break;
									case '02':
										a.startDateMonth = "February ";
										break;
									case '03':
										a.startDateMonth = "March ";
										break;
									case '04':
										a.startDateMonth = "April ";
										break;
									case '05':
										a.startDateMonth = "May ";
										break;
									case '06':
										a.startDateMonth = "June ";
										break;
									case '07':
										a.startDateMonth = "July ";
										break;
									case '08':
										a.startDateMonth = "August ";
										break;
									case '09':
										a.startDateMonth = "September ";
										break;
									case '10': 
										a.startDateMonth = "October ";
										break;
									case '11':
										a.startDateMonth = "November ";
										break;
									case '12':
										a.startDateMonth = "December ";
										break;
								}
								a.endDateYear = (a.endDate || "").substr(0,4);
								switch ((a.endDate || "").substr(5,2)) {
									case '01':
										a.endDateMonth = "January ";
										break;
									case '02':
										a.endDateMonth = "February ";
										break;
									case '03':
										a.endDateMonth = "March ";
										break;
									case '04':
										a.endDateMonth = "April ";
										break;
									case '05':
										a.endDateMonth = "May ";
										break;
									case '06':
										a.endDateMonth = "June ";
										break;
									case '07':
										a.endDateMonth = "July ";
										break;
									case '08':
										a.endDateMonth = "August ";
										break;
									case '09':
										a.endDateMonth = "September ";
										break;
									case '10': 
										a.endDateMonth = "October ";
										break;
									case '11':
										a.endDateMonth = "November ";
										break;
									case '12':
										a.endDateMonth = "December ";
										break;
								}
								if (a.highlights) {
									if (a.highlights[0]) {
										if (a.highlights[0] != "") {
											a.volunterHighlights = true;
										}
									}
								}
							});
						}
					}

					if (resumeObject.skills) {
						if (resumeObject.skills[0].name) {
							resumeObject.skillsBool = true;
						}
					}

					if (resumeObject.press) {
						if (resumeObject.press[0].name) {
							resumeObject.pressBool = true;
						}
					}

					if (resumeObject.duties) {
						if (resumeObject.duties[0].name) {
							resumeObject.dutiesBool = true;
						}
					}

					if (resumeObject.interests) {
						if (resumeObject.interests[0].name) {
							resumeObject.interestsBool = true;
						}
					}

					if (resumeObject.languages) {
						if (resumeObject.languages[0].language) {
							resumeObject.languagesBool = true;
						}
					}

					if (resumeObject.references) {
						if (resumeObject.references[0].name) {
							resumeObject.referencesBool = true;
						}
					}
					
					if (resumeObject.effort) {
						if (resumeObject.effort[0].name) {
							resumeObject.effortBool = true;
						}
					}
					if (resumeObject.service) {
						if (resumeObject.service[0].name) {
							resumeObject.serviceBool = true;
						}
					}
					if (resumeObject.research) {
						if (resumeObject.research[0].name) {
							resumeObject.researchBool = true;
						}
					}

					if (resumeObject.slides) {
						if (resumeObject.slides[0].img) {
							resumeObject.slidesBool = true;
						}
					}
					if (resumeObject.timeline) {
						if (resumeObject.timeline[0].title) {
							resumeObject.timelineBool = true;
						}
					}
					
	
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, resumeObject);
		$('#divtarget').html(rendered);
		addTopBanner(0);

		var vars = getUrlVars();
		if (vars["p"]){
				var page = vars["p"]}
		else{
				var page = 0;
		}


		//switchPage(page);
		switchPage(page);
		
		//twitterBoxWidth();
		
	
		
		}).error(function(d, textStatus, error) { console.log("Error while reading template " + error); });
	
	// }).error(function(d, textStatus, error) { console.log(error); });

		
	

		
		
		

	

	
	