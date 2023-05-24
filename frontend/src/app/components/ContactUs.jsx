import axios from '../../http';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function ContactUs() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/contact', {
            email: event.target.email.value,
            subject: event.target.subject.value,
            message: event.target.message.value
        })
        console.log(response.data);
        if (response.data.success) {
            alert("Message Sent")
        } else {
            alert("Service Error")
        }
        window.location.reload();
    }

    return (
        <Container className="w-75 p-5 my-5">
            <Row className="text-center m-5">
                <p className="fs-1 text-dark">We’d Like to Hear From You</p>
                <p>Got something to share or see something that doesn’t adhere to our standards? We want to know! <br />We’re always working to improve our site and appreciate feedback.</p>
            </Row>

            <form onSubmit={handleSubmit} className="contact-form webform">
                <input type="email" className="form-control " name='email' placeholder="Email" required />
                <input type="text" className="form-control" name='subject' placeholder="Subject" required />
                <textarea className="form-control" rows="5" name='message' placeholder="Message" required />

                <button type="submit" className="form-control btn btn-primary" id="submit-button">Send Message</button>
            </form>
        </Container>
    )
}

export default ContactUs;