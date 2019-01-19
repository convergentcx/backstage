import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';

import * as actionCreators from './store/actions';

import {
  Church,
  Flowers,
  Man,
  Sunflower,
} from './img';

const AccessButton = styled.button`
  pointer: cursor;
  border: solid;
  border-size: 1px;
  border-color: #000;
  background: #2424D0;
  color: #FFF;
  transition: 0.3s;
  width: 300px;
  height: 200px;
  font-size: 1.8rem;
  :hover {
    color: #FFF;
    background: #0044FF;
  }
`;

class AccessControlled extends Component {
  state = {
    isActivated: false,
  }

  render() {
    const { activated } = this.props;

    return (
      <div style={{ width: '100%', height: '100%' }}>
        {
          activated &&
          this.props.children
        }
      </div>
    );
  }
}

class App extends Component {

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', padding: '', justifyContent: '', alignItems: '', height: '100vh' }}>
        <div style={{ display: 'flex', width: '40%', background: '#000', minHeight: '100%' }}>

        </div>
        <div style={{ display: 'flex', width: '60%', background: '#f3f3f3', minHeight: '100%', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ color: 'silver' }}>Exclusive Zone</h1>
          { this.props.authorized ?
            <AccessControlled tokens={5} activated={this.props.authorized}>
              <div style={{ background: '#f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center', height: '100%', marginTop: '120px' }}>
                <img src={Church} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img"/>
                <img src={Man} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img"/>
                <img src={Flowers} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img"/>
                <img src={Sunflower} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img"/>
              </div>
            </AccessControlled>
            :
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AccessButton onClick={this.props.onSign}>Access<br/>With Convergent</AccessButton>
              <button onClick={this.sign}>Sign</button>
              <button onClick={this.deploy}>Test Deploy</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.auth,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSign: () => dispatch(actionCreators.sign())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
