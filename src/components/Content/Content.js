import React from 'react';

import {
    Church,
    Flowers,
    Man,
    Sunflower,
  } from '../../img';

const content = () => (
    <div style={{ background: '#f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center', height: '100%', marginTop: '18px' }}>
        <img src={Church} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img" />
        <img src={Man} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img" />
        <img src={Flowers} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img" />
        <img src={Sunflower} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img" />
    </div>
)

export default content;