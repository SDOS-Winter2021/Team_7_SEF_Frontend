import React from 'react';
// import Logo from '../images/Background.png';
import Carousel from 'react-bootstrap/Carousel'

function WithoutUser() {

    return (
        <Carousel>
            <Carousel.Item class="cropped" interval={5000}>
                <img
                    className="d-block w-100"
                    src="https://simpleeducationfoundation.org/wp-content/uploads/2019/04/Thumbnail_1.jpg?resize=50:*"
                    alt="First slide"
                    height="800"
                />
                <Carousel.Caption>
                    <h3>SIMPLE SCHOOLS</h3>
                    <p>We Work With Four Stakeholders As Part Of Our School Transformation Model</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item class="cropped" interval={5000}>
                <img
                    className="d-block w-100"
                    src="https://simpleeducationfoundation.org/wp-content/uploads/2019/04/0K5C6317.jpg?resize=50:*"
                    alt="Second slide"
                    height="800"
                />

                <Carousel.Caption>
                    <h3>SUPPORT QUALITY EDUCATION</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item class="cropped" interval={5000}>
                <img
                    className="d-block w-100"
                    src="https://simpleeducationfoundation.org/wp-content/uploads/2019/04/0K5C6256.jpg?resize=50:*"
                    alt="Third slide"
                    height="800"
                />

                <Carousel.Caption>
                    <h3>ABOUT US</h3>
                    <p>
                        There are more than 113 million children studying in India's government schools.
          </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default WithoutUser