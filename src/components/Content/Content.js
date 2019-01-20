import React from 'react';

class Content extends React.Component {

    state = {
        contentLinks: []
    }

    componentDidMount() {
        this.fetchData(this.props.economy)
    }

    fetchData = (economy) => {
        fetch('http://localhost:3001/content/' + economy, {
            headers: {
                Authorization: 'Bearer ' + this.props.jwtToken
            }
        })
            .then(res => {
                return res.json()
            })
            .then(resData => {
                const links = resData.content.map(content => {
                    return (
                        content.link
                    )
                })
                this.setState({ contentLinks: links })
            })
    }

    render() {
        const contentElements = this.state.contentLinks.map(contentLink => {
            return (
                // <img key={contentLink} src={contentLink} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img" />
                <iframe
                style={{marginBottom: '20px'}}
                src={contentLink}
                width="640"
                height="360"
                frameBorder="0"
                webkitallowfullscreen="true"
                mozallowfullscreen="true">
            </iframe>
            )
        })

        return (
            <div style={{ background: '#f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center', height: '100%', marginTop: '18px' }}>
                {contentElements}
                {/* <img src={Church} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img" />
                <img src={Man} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img" />
                <img src={Flowers} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img" />
                <img src={Sunflower} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img" /> */}
            </div>
        )
    }
}

export default Content;