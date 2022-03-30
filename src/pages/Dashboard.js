import React from 'react'

class Dashboard extends React.Component {
    render() {

        const titleStyle = {
            color: '#838e9b',
            fontFamily: 'Verdana',
            textTransform: 'uppercase'
        }

        return(
            <div style={{padding: '16px'}}>
                <h1 style={titleStyle}>Dashboard</h1>
            </div>
            
        )
    }
}

export default Dashboard