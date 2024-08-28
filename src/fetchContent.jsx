import React from 'react';

const fetchWebpageContent = async () => {
    // request Axios
    const axios = require('axios');

    axios.get('https://app.scrapingbee.com/api/v1/', {
        params: {
            'api_key': 'LEJQFYAMMG8EMWBB7EJA6FZ36TJA6177ITJC0EQWFWXYTOTT99ZSD8GZ1H0HWZL3LZX5UIDBLXOUF0US',
            'url': 'https://demo.scrapingbee.com/links.html',
            'extract_rules': '{"all_links":{"selector":"a@href","type":"list"}}',
        }
    }).then(function (response) {
        // handle success
        console.log(response);
        return response;
    })
};

export const FetchContent = () => {
    const [metaData, setMetaData] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const htmlContent = await fetchWebpageContent();
            console.log(htmlContent);
        };

        fetchData();
    }, []);

    return (
        <div></div>
    );
};

export default FetchContent;