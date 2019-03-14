import React from 'react';
import axios from 'axios';

class Content extends React.Component {
  state = {
    contentLinks: []
  }

  componentDidMount() {
    this.fetchData(this.props.economy)
  }

  fetchData = async (economy) => {

    const res = await axios.get(`http://localhost:3002/content/${economy}`, { 'headers': { 'Authorization': `Bearer ${this.props.jwtToken}` }})

    const links = res.data.content.map(content => (

      content.link
    ));

    this.setState({ contentLinks: links });
  }

  render() {
    const contentElements = this.state.contentLinks.map(contentLink => (
      <iframe
        key={contentLink}
        key={contentLink.toString()}
        title={contentLink.toString()}
        style={{marginBottom: '20px'}}
        src={contentLink}
        width="640"
        height="360"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true">
      </iframe>
    ));

    return (
      <div style={{ background: '#f3f3f3', display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', width: '100%', alignItems: 'center', height: '100%', marginTop: '18px' }}>
        {contentElements}
      </div>
    );
  }
}

export default Content;