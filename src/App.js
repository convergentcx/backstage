import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import * as actionCreators from './store/actions';

import Content from './components/Content/Content';

const AccessButton = styled.button`
  pointer: cursor;
  border: solid;
  border-color: #000;
  background: #2424D0;
  color: #FFF;
  transition: 0.3s;
  width: 240px;
  height: 80px;
  font-size: 0.8rem;
  border-width: 3px 2px 3px 2px;
  :hover {
    color: #FFF;
    background: #0044FF;
    border-color: #232323;
  }
`;

const NeedToBuy = styled.button`
  pointer: cursor;
  border: none;
  border-color: #000;
  background: #000;
  color: #FFF;
  transition: 0.3s;
  width: 240px;
  height: 80px;
  font-size: 0.8rem;
  border-width: 3px 2px 3px 2px;
  :hover {
    color: #FFF;
    background: #191970;
    border-color: #232323;
  }
`;

const DimensionInput = styled.input`
  width: 28%;
  background: #FFF;
  color: #000;
`;

const CopyButton = styled.button`
  pointer: cursor;
  border: none;
  background: #191970;
  color: #FFF;
  transition: 0.3s;
  width: 50%;
  height: 40px;
  margin-top: 16px;
  margin-right: 8px;
  :hover {
    background: #411999;
  }
`;

const PreviewButton = styled.button`
  pointer: cursor;
  display: block;
  border: none;
  background: #191970;
  color: #FFF;
  transition: 0.3s;
  width: 50%;
  height: 40px;
  margin-top: 16px;
  margin-left: 8px;
  :hover {
    background: #411999;
  }
`;

const MyLink = styled(Link)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
`;

const Backstage = styled.h1`
  background: -webkit-linear-gradient(#411999, #0044FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0;
`;

const normalize = (str) => (
  str.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
);

class AccessControlled extends Component {
  state = {
    isActivated: false,
  }

  componentDidMount() {
    this.props.setInput(this.props.match.params.economy);
  }

  buyTokens = () => {
    this.props.buyTokens(this.props.match.params.economy);
    this.props.onSign();
  }

  render() {
    const { activated } = this.props;

    return (
      <div style={{ width: '100vw', height: '100vh', background: '' }}>
        {
          activated
          ?
          <Content jwtToken={this.props.jwtToken} economy={this.props.address}/>
          :
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', background: '' }}>
            { this.props.verificationFailed ?
              <NeedToBuy onClick={() => this.buyTokens}>
                You don't own enough tokens!<br/>
                Click here to purchase
              </NeedToBuy>
              :
              <AccessButton onClick={this.props.onSign}>Access<br/>With Convergent</AccessButton>
            }
          </div>
        }
      </div>
    );
  }
}

const AcWithRouter = withRouter(AccessControlled);

class App extends Component {
  state = {
    the_input: '',
    width: 500,
    height: 300,
  }
  
  setInput = (economyAddress) => {
    this.setState({the_input: economyAddress})
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const that = this;
    return (
      <div style={{ display: 'flex', flexDirection: 'row', padding: '', justifyContent: '', alignItems: '', minHeight: '100vh' }}>
        <Route path="/preview" render={() => (
          <div>
            <div style={{ display: 'flex', position: 'fixed', top: '0', flexDirection: 'column', alignItems: 'center', width: '40%', color: '#FFF', background: '#000', minHeight: '100%' }}>
              <Backstage>
                Backstage
              </Backstage>
              <h3>What is your economy address?</h3>
              <input 
                type="text"
                name="the_input"
                value={this.state.the_input}
                onChange={this.handleChange}
                style={{ background: '#FFF', paddingLeft: '8px', color: '#000', border: 'none', width: '80%', height: '30px' }}
              />
              <h5>Choose your dimensions:</h5>
              Width: <DimensionInput
                type="text"
                name="width"
                value={this.state.width}
                onChange={this.handleChange}
              />
              Height: <DimensionInput
                type="text"
                name="height"
                value={this.state.height}
                onChange={this.handleChange}
              />
              <h5>Your embed code:</h5>
              <div style={{ display: 'flex', flexFlow: 'row', overflowX: 'scroll', width: '90%', height: '88px', background: '#f9f9f9', padding: '8px', color: '#000', borderRadius: '' }}>
                <code id="embed">
                  { `<iframe src="https://backstage.convergent.cx/#/production/${this.state.the_input}" width="${this.state.width}" height="${this.state.height}"></iframe>` }
                </code>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
                <CopyButton
                  onClick={() => navigator.clipboard.writeText(normalize(document.getElementById('embed').innerHTML))}
                >
                  Click here to copy
                </CopyButton>
                <MyLink to={"/preview/" + this.state.the_input} onClick={() => this.forceUpdate()}>
                  <PreviewButton>
                    Preview
                  </PreviewButton>
                </MyLink>
              </div>
            </div>
            <div style={{ display: 'flex', marginLeft: '40%', width: '60%', background: '#f3f3f3', minHeight: '100%', flexDirection: 'column', alignItems: 'center' }}>
              <Route path='/preview/:economy' render={() => (
                <AcWithRouter 
                  tokens={5} 
                  verificationFailed={this.props.verificationFailed}
                  jwtToken={this.props.jwtToken} 
                  address={this.state.the_input} 
                  onSign={() => that.props.onSign(this.state.the_input)} 
                  activated={that.props.authorized} 
                  setInput={this.setInput}
                  tryBuy={(economyAddress) => that.props.tryBuy(economyAddress)}
                />
              )}/>
            </div>
        </div>
        )}/>
        <Route path='/production/:economy' render={() => (
          <AcWithRouter
            tokens={5}
            verificationFailed={this.props.verificationFailed}
            onSign={() => that.props.onSign(this.state.the_input)} 
            activated={that.props.authorized} 
            setInput={this.setInput}
            tryBuy={(economyAddress) => that.props.tryBuy(economyAddress)}
            />
        )}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.auth,
    verificationFailed: state.verificationFailed,
    jwtToken: state.jwtToken
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSign: (economyAddress) => dispatch(actionCreators.sign(economyAddress)),
    tryBuy: (economyAddress) => dispatch(actionCreators.buy(economyAddress)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
