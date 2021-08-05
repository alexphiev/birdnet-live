import React from 'react';
import styled from 'styled-components';
import {Button, Col, Container, DropdownButton, Navbar} from "react-bootstrap";
import logo from "../../images/cornell_lab_logo.png";
import DropdownItem from "react-bootstrap/DropdownItem";
import PropTypes from "prop-types";

/* component styles */
const StyledHeader = styled.div`
  .logo {
    width: 400px;
    max-width: 100%;          /* WebKit-based browsers will ignore this. */
  }
  
  .navbar {
    width: 100%;
  }
  
  .container {
    max-width: 80%;
  }
  
  .page-title {
    margin-bottom: unset;
  }
  
  .btn {
    background-color: var(--theme-dark-green);
    margin: 0 11px 0 11px;
    padding: 10px 20px 10px 20px;
    border: none;
  }
  
  .dropdown {
    display: flex;
    justify-content: center;
  }
`;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
        };

        this.onClickPlayButton = this.onClickPlayButton.bind(this);
    }

    onClickPlayButton() {
        const newState = !this.state.isPlaying;
        this.setState({isPlaying: newState});

        this.props.play(newState);
    }

    render() {
        return (
            <StyledHeader>
                <header className="App-header">
                    <Navbar>
                        <Container>
                            <Col lg={4}>
                                <img className="logo" src={logo} alt="Cornell Lab logo"/>
                            </Col>
                            <Col lg={4}>
                                <h2 className="page-title">BirdNET Live</h2>
                            </Col>
                            <Col className="dropdown" lg={4}>
                                <Button onClick={this.onClickPlayButton}>
                                    {
                                        this.state.isPlaying ? "PAUSE" : "PLAY"
                                    }
                                </Button>
                                <DropdownButton title="Language">
                                    <DropdownItem active={true}>English</DropdownItem>
                                    <DropdownItem>French</DropdownItem>
                                    <DropdownItem>Spanish</DropdownItem>
                                    <DropdownItem>German</DropdownItem>
                                </DropdownButton>
                            </Col>
                        </Container>
                    </Navbar>
                </header>
            </StyledHeader>
        );
    }
}

Header.propTypes = {
    enableSound: PropTypes.func,
    play: PropTypes.func
};

export default Header;