import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsArrowLeft } from 'react-icons/bs'
import { useHistory } from 'react-router-dom';
import { AiTwotoneLike } from 'react-icons/ai'
import { GrLocation } from 'react-icons/gr'
import { MdDescription } from 'react-icons/md'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Col, Row, Input, Container } from 'reactstrap';

const Profile = () => {

    const history = useHistory();
    const BackToSearch = () => {
        localStorage.removeItem("Username")
        history.push("/home")
    }

    useEffect(getUser, []);
    const [userData, setUserData] = useState([]);
    const [userDataImg, setUserDataImg] = useState([]);
    const idApi = (process.env.REACT_APP_UNSPLASH_KEY);
    function getUser() {
        const userName = localStorage.getItem("Username")
        const url = "https://api.unsplash.com/search/users?query=" + userName + "&client_id=" + idApi
        const url2 = "https://api.unsplash.com/users/" + userName + "/photos?per_page=16&client_id=" + idApi
        axios.get(url).then((dataUser) => {
            setUserData(dataUser.data.results[0]);
        })
        axios.get(url2).then((dataUserImg) => {
            setUserDataImg(dataUserImg.data);
        })
    }


    console.log(userDataImg);
    return (

        <div>
            <Form>
                <Row form>
                    <Col sm={3}>
                        <FormGroup>

                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <h1>UNSPLASH API</h1>
                        <h2>GALLERY</h2>
                    </Col>
                    <Col sm={3}>
                        <FormGroup>

                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            {Object.keys(userData).length !== 0 ?
                <div>
                    <img className="imgProfile" src={userData.profile_image.large} />
                    <h5 className="usernameProfile">{userData.name}</h5>
                </div>
                : null}
            <Button className="buttonBack" onClick={() => { BackToSearch() }} color="primary"><BsArrowLeft /> Back Page.</Button>
            <div className="layout2">
            {userDataImg.map((img) => (
                    <Container>
                        <Row Card>
                            <Card className="card2">
                                <CardImg className="img" src={img.urls.small} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle className="username">{img.user.name}</CardTitle>
                                    <CardSubtitle className="likes"><AiTwotoneLike /> {img.likes}</CardSubtitle>
                                    <CardText className="likes"><MdDescription /> {img.description}</CardText>
                                    <CardText className="likes"><GrLocation /> {img.user.location}</CardText>
                                </CardBody>
                            </Card>
                        </Row>
                    </Container>
            ))}
            </div>
            <h5 className="textfooter">Copyright © 2021 Apple Inc. สงวนสิทธิ์ทุกประการ</h5>
        </div>
    )
}

export default Profile;