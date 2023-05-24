import React, { useState } from 'react';

import Footer from "../components/Footer"
import NavBar from "../components/Navbar"
import axios from '../../http';

function Tools() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const calculateBmi = async (e) => {
        e.preventDefault();
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        alert("Your BMI is: " + bmi);
        // if(localStorage.getItem('id')) {
        //     const response = await axios.patch("/auth/update", )
        // }
        window.location.reload();
    };

    return (
        <div>
            <NavBar />
            <section className="container mb-5">
                <h1 className="text-center w-75">Body mass index</h1>
                <div className="row my-2">
                    <h2 className="mb-0 ">BMI Calculator</h2>
                    <div className="col-xl-8 col-lg-9 col-sm-12 col-md-12 bg-dark bg-gradient">
                        <form className="form-group my-2 fw-medium text-white" onSubmit={calculateBmi}>
                            <table className="w-100">
                                <tr>
                                    <td className="ps-5 w-25">Age</td>
                                    <td className="pe-2"><input autoComplete='off' className="w-100" name="age" type="text" max="120" min="2" placeholder="Age" /></td>
                                    <td>ages 2 - 120</td>
                                </tr>
                                <tr>
                                    <td className="ps-5 w-25">Gender</td>
                                    <td colSpan="2">
                                        <input autoComplete='off' className="me-2" type="radio" name="gender" value="Male" />Male
                                        <input autoComplete='off' className="me-2" type="radio" name="gender" value="Female" />Female
                                    </td>
                                </tr>
                                <tr>
                                    <td className="ps-5 w-25">Height</td>
                                    <td className="pe-2"><input autoComplete='off' className="w-100" value={height} onChange={(e) => setHeight(e.target.value)} type="text" min="1" /></td>
                                    <td>in (cm)</td>
                                </tr>
                                <tr>
                                    <td className="ps-5 w-25">Weight</td>
                                    <td className="pe-2"><input autoComplete='off' className="w-100" value={weight} onChange={(e) => setWeight(e.target.value)} min="1" /></td>
                                    <td>in (kg)</td>
                                </tr>
                            </table>
                            <button type="submit" className="btn btn-light">Calculate</button>
                        </form>
                    </div>


                </div>
            </section>

            <section className="container ps-0 my-5">
                <div className="w-75 text-black fs-6 ">
                    <h4>BMI Introduction</h4>
                    <p>BMI stands for Body Mass Index, which is a measure of body fat based on a person's weight and height. It is calculated by dividing a person's weight in kilograms by their height in meters squared (BMI = weight (kg) / height (m)<sup>2</sup>).</p>
                    <p>BMI is used as a screening tool to identify possible weight problems in adults. However, it is important to note that BMI is not a perfect measure of body fatness, as it does not account for differences in body composition and can lead to misclassNameifications for individuals with high muscle mass or bone density.</p>
                    <p>Here are the general categories for BMI:</p>
                    <ul>
                        <li>Underweight: BMI less than 18.5</li>
                        <li>Normal weight: BMI between 18.5 and 24.9</li>
                        <li>Overweight: BMI between 25 and 29.9</li>
                        <li>Obesity: BMI of 30 or higher</li>
                    </ul>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Tools;