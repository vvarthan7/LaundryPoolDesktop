import React, { Component } from 'react'
import Banner from '../../images/banner.png'
import User from '../../images/user.png'
import Envelope from '../../images/envelope.png'
import Smartphone from '../../images/smartphone.png'

class Home extends Component {
    state = {
        userName: "",
        email: "",
        phone: "",
        errors: '',
        success: ''
    }
    onSubmit = (e) => {
        e.preventDefault();

        const nameRegex = /^[a-zA-Z]{2,10}$/;
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        const phoneRegex = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

        if (!nameRegex.test(this.state.name) || this.state.userName === '') {
            this.setState({ error: 'Name must be between 2 and 10 characters' })
        } else if (!emailRegex.test(this.state.email) || this.state.email === '') {
            this.setState({ error: 'Enter a valid email' })
        } else if (!phoneRegex.test(this.state.phone) || this.state.phone === '') {
            this.setState({ error: 'Enter a valid phone' })
        } else {
            this.setState({
                error: '',
                userName: "",
                email: "",
                phone: "",
                success: 'Thank you ! Will get back to you soon.'
            })
            setTimeout(() => { this.setState({ success: '' }) }, 2000)
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { error, success } = this.state
        return (
            <div className="container">
                <div className="row main-row">
                    <div className="col-md-6 first-col">
                        <img src={Banner} alt="banner" className="banner-image" />
                        <h2>Laundry is getting ready</h2>
                        <p>We are working on our website, Stay turned</p>
                    </div>
                    <div className="col-md-6 last-col">
                        <h2 className="form-title">For Business Queries</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-input-style">
                                <label htmlFor="name">Name</label>
                                <img src={User} alt="user" className="input-image user" />
                                <input
                                    name="userName"
                                    value={this.state.userName}
                                    onChange={this.onChange}
                                    type="text"
                                />
                            </div>
                            <div className="form-input-style">
                                <label htmlFor="email">E-mail</label>
                                <img src={Envelope} alt="envelope" className="input-image envelope" />
                                <input
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    type="text"
                                />
                            </div>
                            <div className="form-input-style">
                                <label htmlFor="phone">Phone</label>
                                <img src={Smartphone} alt="smartphone" className="input-image smartphone" />
                                <input
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                    type="text"
                                />
                                {error && <div className="invalid-feedback">{error}</div>}
                                {success && <div className="valid-feedback">{success}</div>}
                            </div>
                            <button type="submit" className="submit-btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
