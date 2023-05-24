import React from 'react';
import axios from '../../http';
import Footer from "../components/Footer"
import NavBar from "../components/Navbar"

function SignUp() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/auth/register', {
            username: event.target.username.value,
            password: event.target.password.value
        })
        console.log(response.data);
        if (!(response.data.success)) {
            alert("Service Error")
        } else {
            alert("Sign Up Success")
        }
        window.location.reload();
    }

    return (
        <>
            <NavBar />

            <section className="registration-form">
                <div className="w-75 mx-auto">
                    <div className="row">
                        <div className="col-xxl-8 col-xl-8 col-lg-8 pt-3">
                            <h2 className="mb-3 text-center">Membership Form</h2>
                            <form onSubmit={handleSubmit} className="membership-form">
                                <input type="email" className="form-control rounded-3" name="username" placeholder="Email" required autoComplete='off'/>
                                <input type="password" className="form-control rounded-3" name="password" pattern="(?=.*\d.*\d)(?=.*[a-zA-Z]).{6}" title="Password must be 6 characters long with at least 2 digits." placeholder="Password" required />
                                <button type="submit" className="form-control btn btn-dark">Create Account</button>
                            </form>
                            <p className='text-center mt-3' id="result"></p>
                        </div>

                        <div className="col-xxl-4 col-xl-4 col-lg-4 text-light bg-dark bg-gradient rounded-5 p-3">
                            <h2 className="text-center">Free Subscription</h2>
                            <p className="text-light">Create a Account and enjoy our free services</p>
                            <ul>
                                <li>Workouts</li>
                                <li>Articles</li>
                                <li>Tools</li>
                                {/* </ul> */}
                                {/* <h2 className="text-center">Paid Subscription</h2> */}
                                {/* <ul> */}
                                <li>FitMe Programs</li>
                                <li>Professional Guidance</li>
                            </ul>
                            <hr />
                            <h5>Already Have an account?</h5>
                            <a href="/Login"><button className="btn btn-light rounded-5 w-100">Sign In</button></a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default SignUp;