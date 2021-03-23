import React, { useState } from 'react'
import axios from 'axios'
import { AiTwotoneLike } from 'react-icons/ai'
import { GrLocation } from 'react-icons/gr'
import { MdDescription } from 'react-icons/md'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Col, Row, Input, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [keyword, setKeyword] = useState();
    const [groupImg, setGroupImg] = useState([]);
    const searchKey = (e) => {
        setKeyword(e.target.value)
    }

    const history = useHistory();
    const sendUsername = (userName) => {
        localStorage.setItem("Username", userName)
        history.push("/profile")
    }

    const idApi = (process.env.REACT_APP_UNSPLASH_KEY);
    const getImg = () => {
        const url = "https://api.unsplash.com/search/photos?page=1&query=" + keyword + "&per_page=16&client_id=" + idApi
        axios.get(url).then((dataImg) => {
            setGroupImg(dataImg.data.results)
        })
    }



    console.log(groupImg);
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
                <Row form>
                    <Col sm={3}>
                        <FormGroup>

                        </FormGroup>
                    </Col>
                    <Col sm={5}>
                        <FormGroup>
                            <Input type="text" name="text" id="input" onChange={searchKey} />
                        </FormGroup>
                    </Col>
                    <Col sm={1}>
                        <FormGroup>
                            <Button color="primary" id="button" onClick={getImg}>Search</Button>
                        </FormGroup>
                    </Col>
                    <Col sm={3}>
                        <FormGroup>

                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <div className="layout">
                {groupImg.map((img) => (

                    <div>
                        <Container>
                            <Row Card>
                                <Card className="card">
                                    <CardImg className="img" src={img.urls.small} alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle onClick={() => { sendUsername(img.user.username) }} className="username">{img.user.username}</CardTitle>
                                        <CardSubtitle className="likes"><AiTwotoneLike /> {img.likes}</CardSubtitle>
                                        <CardText className="likes"><MdDescription /> {img.description}</CardText>
                                        <CardText className="likes"><GrLocation /> {img.user.location}</CardText>
                                        <Button onClick={() => { sendUsername(img.user.username) }}>Description</Button>
                                    </CardBody>
                                </Card>
                            </Row>
                        </Container>
                    </div>

                ))}
            </div>
            <h5 className="textfooter">Copyright © 2021 Unsplash AIP Gallery. สงวนสิทธิ์ทุกประการ</h5>
        </div>
    )
}

export default Search;