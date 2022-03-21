import React from "react";

const Footer = () => {
    let styles = {
        fontSize: 20,
        textAlign: 'center'
    };
    return (
        <footer>
            <p style={styles}>{new Date().getFullYear()}@GeekBrains</p>
        </footer>
    )
}

export default Footer
