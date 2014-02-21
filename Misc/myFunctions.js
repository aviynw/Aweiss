		var debug = 0;
		var root = ''
		function replace(content) {
					document.open();
					document.write(content);
					document.close();
				}
				
			function getNewSalt(email) {
				var salt = null;
				$.ajax({
					type : 'POST',
					url : root+'/request_salt/',
					data : {
						'email' : email
					},
					async : false,
					success : function(saltData) {
						if(saltData['success']==true) {
							salt = saltData['salt'];
							//alert('salt:'+salt)
						} else {
							throw "no matching user"
						}
					}
				});
				return salt
			}

			function loadViewWithCredentials(url, data, type, authorization, email, password, authorizedHandler, notAuthorizedHandler) {
				responder = function(dataReturned) {
					var message = dataReturned['message'];
					var content = dataReturned['content'];
					if(message['success']==true) {
						if(!authorizedHandler) {
							replace(content);
						} else {
							authorizedHandler.render(content, message);
						}
					} else {
						if(!notAuthorizedHandler) {
							replace(content);
						} else {
							notAuthorizedHandler.render(content, message);
						}
					}
				}
				loadWithCredentials(url, data, type, authorization, email, password, responder);
			}

			function loadWithCredentials(url, data, type, authorization, email, password, responder) {
				var reload = false;
				var authorization=authorization;
				var initialized = {
					'initialized' : 'True',
					'authorization' : authorization
				}
				var authorizedThrough = false;
				if(authorization) {
					var salt = null;
					var authorizedThrough=false;
					if($.jStorage.get('salt')) {
						salt = $.jStorage.get('salt');
					} else {
						try {
							salt = getNewSalt(email);
						} catch(e) {
							authorization = false;
							authorizedThrough = false;
						}
					}
					if(debug>=1){
						alert('salt'+salt);
					}
					var hash=password;
					hash = hash + salt;
					hash = Crypto.SHA256(hash);
					userInfo = {
						'email' : email,
						'password' : hash
					}
					authorizedThrough = true;
					if(debug>=1){
						alert('hash:' + hash);
					}
				} else {
					authorizedThrough = false;
				}
				var dataToSend = {};
				if(authorizedThrough) {
					var combinedData = $.extend({}, data, userInfo);
					dataToSend = $.extend({}, combinedData, initialized);
				} else {
					dataToSend = dataToSend = $.extend({}, data, initialized);
				}
				$.ajax({
					type : type,
					url : url,
					data : dataToSend,
					async : false,
					success : function(dataReturned) {

						if(authorization) {
							var message = dataReturned['message'];
							if(debug>=1){
							alert('success'+message['success'])
							alert('outofdate:'+message['outOfDateSalt'])
							alert('testedSalt:'+message['testedSalt'])
							alert(' recevied salt:' + message['salt'] + '\n Local Salt:' + salt)
							}
							if(message['success']==true) {
								$.jStorage.set('email', email);
								$.jStorage.set('password', password);
								$.jStorage.set('salt', salt + 1);
							} else {

								if(message['saltOutOfDate']==true) {
									var newSalt = getNewSalt(email);
									$.jStorage.set('salt', newSalt);
									if(debug>=1){
										alert('salt out of date. newSalt:'+$.jStorage.get('salt'));
									}
									reload = true;
								}
								if(message['testedSalt']==true && message['salt'] != salt) {
									var newSalt = message['salt']
									$.jStorage.set('salt', newSalt);
									if(debug>=1){
										alert('gave in wrong salt. newSalt:'+$.jStorage.get('salt'));
									}
									reload = true;
								}
							}
							if(reload) {
								loadWithCredentials(url, data, type, authorization, email, password, responder);
							}
						}

						if(!reload) {
							responder(dataReturned);
						}
					}
				});
			}

			function load(url, data, type, responder) {
				stData = getStandardData();
				loadWithCredentials(url, data, type, false, stData['email'], stData['password'], responder);
			}

			function loadView(url, data, type) {
				stData = getStandardData();
				loadViewWithCredentials(url, data, type, stData['authorization'], stData['email'], stData['password'], null, null);
			}

			function getStandardData() {
				var email = $.jStorage.get('email');
				var password = $.jStorage.get('password');
				var authorization = true;
				if(!email || !password) {
					authorization = false;
				} else {
					authorization = true;
				}
				return {
					'email' : email,
					'password' : password,
					'authorization' : authorization
				};
			}

			function loadURL(url) {
				var data = {};
				loadView(url, data, 'GET');
			}