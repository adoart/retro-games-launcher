import React from 'react';
import axios from "axios";
import * as cheerio from 'cheerio';

const apiKey = import.meta.env.VITE_SCRAPINGBEE_API_KEY;

const fetchAxiosCheerio = async () => {
    console.log('fetchAxiosCheerio')
    try {
        // Doesn't work for retrogames.cc/arcade-games/
        // Load Reddit
        const {data} = await axios.get(
            'https://old.reddit.com/r/programming/'
        );

        // Parse HTML with Cheerio
        const $ = cheerio.load(data);

        // Initialise empty data array
        const postTitles = [];

        // Iterate over all anchor links for the given selector and ....
        $('div > p.title > a').each((_idx, el) => {
            // .... extract for each the tag text and add it to the data array
            const postTitle = $(el).text()
            postTitles.push(postTitle)
        });

        // Return the array with all titles
        return postTitles;
    } catch (error) {
        throw error;
    }
};

const fetchAxios = async () => {
    console.log('fetchAxios')
    // axios.get('https://dev.to/aurelkurtula')
    axios.get('https://www.retrogames.cc/arcade-games', {headers:
            [
                {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36'},
                {'scheme': 'https'},
                {'authority': 'www.retrogames.cc'},
                {'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'},
                // {'Access-Control-Allow-Origin': '*'},
                {'sec-fetch-dest': 'document'}
            ]})
        .then((response) => {
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                let devtoList = [];
                $('.single-article').each(function(i, elem) {
                    devtoList[i] = {
                        title: $(this).find('h3').text().trim(),
                        url: $(this).children('.index-article-link').attr('href'),
                        tags: $(this).find('.tags').text().split('#')
                            .map(tag =>tag.trim())
                            .filter(function(n){ return n != "" })
                    }
                });

                return devtoList.join('\n');
            } else {
                return response.status;
            }
        }, (error) => console.log(err) );

    // // request Axios
    // axios
    //     // Request Reddit URL
    //     .get('https://www.reddit.com/r/programming.json')
    //     // Configure callback for the HTTP response
    //     .then((response) => {
    //         // console.log(response)
    //         return response;
    //     })
    //     // Configure error callback
    //     .catch((error) => {
    //         console.error(error)
    //     });
};

const fetchScrappingbee = async () => {
    console.log('fetchScrappingbee')
    // Using scrapingbee (paid)
    return axios.get('https://app.scrapingbee.com/api/v1/', {
        params: {
            'api_key': apiKey,
            'url': 'https://www.retrogames.cc/psx-games/tekken-3.html',
            'extract_rules': '{\n' +
                '    "all_links" : {\n' +
                '        "selector": "a",\n' +
                '        "type": "list",\n' +
                '        "output": {\n' +
                '            "anchor": "a",\n' +
                '            "href": {\n' +
                '                "selector": "a",\n' +
                '                "output": "@href"\n' +
                '            }\n' +
                '        }\n' +
                '    }\n' +
                '}',
        }
    })
};


export const FetchContent = () => {
    const [metaData, setMetaData] = React.useState({});

    fetchScrappingbee().then(response => console.log('Scrappingbee response:', response));

    // fetchAxios().then(response => console.log('Axios response:', response));

    // Wait for the promise to fulfill and print the title array it returned
    // fetchAxiosCheerio()
    //     .then((response) => console.log('Axios Cheerios response:', response));

    return (
        <div></div>
    );
};

export default FetchContent;