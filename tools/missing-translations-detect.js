/*
	This code can be run at settings page to print missing translations at console
 */

var check_missing_translations = (code) => {
	let language = window.gca_languages[code];
	let english = window.gca_languages['en'];

	let recuresive_check = (instance, template, callback, path = []) => {
		for (let item in template) {
			if (template.hasOwnProperty(item)) {
				if (typeof template[item] === 'object' && !(template[item] instanceof Array) && instance.hasOwnProperty(item)) {
					recuresive_check(instance[item], template[item], callback, [... path, item]);
				}
				else if (!instance.hasOwnProperty(item)) {
					callback([... path, item], template[item]);
				}
			}
		}
	};
	recuresive_check(language, english, (path, english) => {
		console.log(path.join('.') + ' = ' + (typeof english === 'string' ? JSON.stringify(english) : '[' + (typeof english) + ']'));
	});
}

let lang_code = prompt('Language Code (e.g. en)');
check_missing_translations(lang_code);
