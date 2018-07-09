import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<div>
				<footer className="footer">
					<div className="container">
						<div className="content has-text-centered">
							<p>&copy; Adway S. Wadekar 2018</p>
							<p>
								Made with <i className="fas fa-heart" /> &{' '}
								<i className="fas fa-utensils" /> by in the beautiful city of
								Boston, MA.
							</p>
							<p>adway [@] adway [dot] io</p>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default Footer;
