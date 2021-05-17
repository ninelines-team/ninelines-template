import Share from 'ninelines-sharing';

if (document.querySelector('[data-social]')) {
	const list = document.querySelectorAll('[data-social]');

	Array.prototype.forEach.call(list, (item) => {
		item.addEventListener('click', (e) => {
			const social = e.currentTarget.dataset.social;
			const url = location.origin + location.pathname;

			Share[social](url);
		});
	});
}
