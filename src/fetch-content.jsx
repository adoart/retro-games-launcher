import React from 'react';
import {ApifyClient} from "apify-client";

const viteapifyapikey = import.meta.env.VITE_APIFY_API_KEY;

const fetchApify = async (url) => {
    const client = new ApifyClient({token: viteapifyapikey});
    // Starts an actor and waits for it to finish.
    // const run = await client.task("adoart~cheerio-scraper-retrogames-cc-task").call();
    // const { items } = await client.dataset(run.defaultDatasetId).listItems();

    // Fetches results from the actor's dataset.
    const { items } = await client.dataset("adoart~arcade-games-links-dataset").listItems();

    //store data in local storage
    localStorage.setItem('arcade-games', JSON.stringify(items));

    console.log('localStorage item 11 iframe:', JSON.parse(localStorage.getItem('arcade-games'))[11].iframe);
    return items;
};

fetchApify('https://www.retrogames.cc/arcade-games/').then(response => console.log('Apify response:', response));

export default function FetchContent() {
    return (
        <div>
            <html>
                <div>TODO return Fetched Content</div>
            </html>
        </div>
    );
};