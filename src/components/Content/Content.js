import React from 'react';

class Content extends React.Component {
  state = {
    contentLinks: []
  }

  componentDidMount() {
    this.fetchData(this.props.economy)
  }

  fetchData = async (economy) => {
    const res = await fetch(`http://ec2-3-122-54-228.eu-central-1.compute.amazonaws.com:59558/content/${economy}`, {
      headers: {
        Authorization: `Bearer ${this.props.jwtToken}`,
      }
    });

    const links = res.json().content.map(content => (
      content.link
    ));

    this.setState({ contentLinks: links });
  }

  render() {
    const contentElements = this.state.contentLinks.map(contentLink => (
      <iframe
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
      <div style={{ background: '#f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center', height: '100%', marginTop: '18px' }}>
        {contentElements}
      </div>
    );
  }
}

export default Content;