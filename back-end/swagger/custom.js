window.onload = function () {
	const authButton = document.createElement('button');
	authButton.innerHTML = 'Authorization';
	authButton.onclick = function () {
		const Authorization = prompt('Enter your API key:');
		//const accessLevel = prompt('Enter your access level:');

		if (token){//)
			const authHeader =token;
			//const accessLevelHeader = accessLevel;\\

			window.ui.preauthorizeApiKey('Authorization', authHeader);
			//window.ui.preauthorizeApiKey('access-level', accessLevelHeader);
		}
	};

	const header = document.querySelector('.header');
	if (header) {
		header.appendChild(authButton);
	}
};