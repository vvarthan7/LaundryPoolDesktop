import React, { Component } from 'react';
import Banner from '../../images/banner.png';
import User from '../../images/user.png';
import Envelope from '../../images/envelope.png';
import Smartphone from '../../images/smartphone.png';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');
class Home extends Component {
	constructor() {
		super();
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	openModal() {
		this.setState({
			modalIsOpen: true,
			success: 'We will get back to you soon.'
		});
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		// this.subtitle.style.color = '#f00';
	}

	closeModal() {
		this.setState({
			modalIsOpen: false
		});
	}
	state = {
		modalIsOpen: false,
		userName: '',
		email: '',
		phone: '',
		errors: '',
		success: ''
	};
	onSubmit = (e) => {
		e.preventDefault();
		const nameRegex = /^[a-zA-Z]{2,10}$/;
		const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
		const phoneRegex = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

		if (!nameRegex.test(this.state.name) || this.state.userName === '') {
			this.setState({
				error: 'Name must be between 2 and 10 characters'
			});
		} else if (!emailRegex.test(this.state.email) || this.state.email === '') {
			this.setState({
				error: 'Enter a valid email'
			});
		} else if (!phoneRegex.test(this.state.phone) || this.state.phone === '') {
			this.setState({
				error: 'Enter a valid phone'
			});
		} else {
			axios
				.post(`https://us-central1-daily-22.cloudfunctions.net/emailMessage?dest=vvarthan7@gmail.com`, {
					name: this.state.userName,
					email: this.state.email,
					phone: this.state.phone
				})
				.then((res) => {
					this.openModal();
					this.setState({
						error: '',
						userName: '',
						email: '',
						phone: ''
					});
				});
		}
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		const { error, success } = this.state;
		return (
			<div className="container">
				<div className="row main-row">
					<div className="col-md-6 first-col">
						<img src={Banner} alt="banner" className="banner-image" />
						<h2> Laundry is getting ready </h2> <p> We are working on our website, Stay tuned </p> {' '}
					</div>{' '}
					{' '}
					<div className="col-md-6 last-col">
						<h2 className="form-title"> For Business Queries </h2> {' '}
						<form onSubmit={this.onSubmit}>
							<div className="form-input-style">
								<label htmlFor="name"> Name </label> {' '}
								<img src={User} alt="user" className="input-image user" />
								<input
									name="userName"
									value={this.state.userName}
									onChange={this.onChange}
									type="text"
								/>
							</div>{' '}
							{' '}
							<div className="form-input-style">
								<label htmlFor="email"> E - mail </label> {' '}
								<img src={Envelope} alt="envelope" className="input-image envelope" />
								<input name="email" value={this.state.email} onChange={this.onChange} type="text" />
							</div>{' '}
							{' '}
							<div className="form-input-style">
								<label htmlFor="phone"> Phone </label> {' '}
								<img src={Smartphone} alt="smartphone" className="input-image smartphone" />
								<input
									name="phone"
									value={this.state.phone}
									onChange={this.onChange}
									type="text"
								/>{' '}
								{error && <div className="invalid-feedback"> {error} </div>} {' '}
								{/* {success && <div className="valid-feedback"> {success} </div>}{' '} */}{' '}
							</div>{' '}
							{' '}
							<button type="submit" className="submit-btn">
								{' '}
								Submit {' '}
							</button>{' '}
							{' '}
						</form>{' '}
						{' '}
					</div>{' '}
					{' '}
				</div>{' '}
				{' '}
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Success Model"
				>
					<div className="card">
						<div className="card-body">
							<h5 className="card-title"> Thank You! </h5> <p className="card-text"> {success} </p>{' '}
							<p className="text-center">
								<button className="btn  btn-link" onClick={this.closeModal}>
									Close{' '}
								</button>{' '}
							</p>{' '}
						</div>{' '}
					</div>{' '}
					<div />
				</Modal>{' '}
			</div>
		);
	}
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

export default Home;
