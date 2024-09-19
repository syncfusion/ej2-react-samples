import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ComboBoxComponent, FilteringEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { cosineSimilarity } from "../common/cosine-similarity";
import { useEffect } from "react";
import { updateAISampleSection } from '../common/sample-base';

function ComboBoxSemanticSearch() {
    useEffect(() => {
        updateAISampleSection();
    }, [])
    const getEmbeddingsData = async () => {
        for (let product of products) {
            let data: number[] = (await (window as any).embeddingModel(
                product.Name + " " + product.Category + " " + product.Brand + " " + product.Description
            )) as number[];
            productEmbeddings[product.ID] = data;
        }
    };

    let products: any = [
        { ID: 1, Name: "iPhone 13", Category: "Electronics", Brand: "Apple", Description: "A15 Bionic chip" },
        { ID: 2, Name: "Galaxy S21", Category: "Electronics", Brand: "Samsung", Description: "Flagship phone" },
        { ID: 3, Name: "PlayStation 5", Category: "Gaming", Brand: "Sony", Description: "Next-gen gaming" },
        { ID: 4, Name: "MacBook Pro", Category: "Computers", Brand: "Apple", Description: "laptop with M1 chip" },
        { ID: 5, Name: "Surface Pro 7", Category: "Computers", Brand: "Microsoft", Description: "2-in-1 laptop" },
        { ID: 6, Name: "Nintendo Switch", Category: "Gaming", Brand: "Nintendo", Description: "Hybrid console" },
        { ID: 7, Name: "Echo Dot", Category: "Smart Home", Brand: "Amazon", Description: "smart speaker" },
        { ID: 8, Name: "Roomba i7", Category: "Home Appliances", Brand: "iRobot", Description: "robot vacuum" },
        { ID: 9, Name: "OLED TV", Category: "Electronics", Brand: "LG", Description: "4K OLED TV" },
        { ID: 10, Name: "AirPods Pro", Category: "Accessories", Brand: "Apple", Description: "wireless earbuds" },
        { ID: 11, Name: "Galaxy Watch 4", Category: "Wearables", Brand: "Samsung", Description: "Smartwatch" },
        { ID: 12, Name: "Kindle Paperwhite", Category: "Electronics", Brand: "Amazon", Description: "E-reader" },
        { ID: 13, Name: "Dyson V11", Category: "Home Appliances", Brand: "Dyson", Description: "vacuum cleaner" },
        { ID: 14, Name: "GoPro HERO9", Category: "Cameras", Brand: "GoPro", Description: "Action camera" },
        { ID: 15, Name: "Fitbit Charge 5", Category: "Wearables", Brand: "Fitbit", Description: "Fitness tracker" },
        { ID: 16, Name: "Nest Thermostat", Category: "Smart Home", Brand: "Google", Description: "Smart thermostat" },
        { ID: 17, Name: "Sony WH-1000XM4", Category: "Accessories", Brand: "Sony", Description: "wireless headphones" },
        { ID: 18, Name: "Instant Pot Duo", Category: "Home Appliances", Brand: "Instant Pot", Description: "pressure cooker" },
        { ID: 19, Name: "Roku Streaming Stick+", Category: "Electronics", Brand: "Roku", Description: "4K HDR streaming device" },
        { ID: 20, Name: "Bose SoundLink", Category: "Accessories", Brand: "Bose", Description: "Bluetooth speaker" }
    ]
    let productEmbeddings: { [key: string]: number[] } = {};

    async function filteringData(e: FilteringEventArgs) {
        if (e.text.length > 0) {
            let queryVector: any = await (window as any).embeddingModel(e.text);
            const similarityThreshold: number = 0.83;
            const outputData = products.filter((country: any) => {
                const similarity = cosineSimilarity(
                    productEmbeddings[country.ID],
                    queryVector
                );
                if (similarity > similarityThreshold) {
                    return country;
                }
            });
            if (outputData.length > 0) {
                let query = new Query();
                e.updateData(outputData, query);
            }
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='container' style={{ margin: "50px", textAlign: "center", alignContent: "center", flexWrap: "wrap" }}>
                    <p style={{ fontWeight: 600 }}>Select an Product</p>
                    <ComboBoxComponent
                        id='combo-box'
                        dataSource={products}
                        fields={{ text: "Name", value: "ID" }}
                        placeholder="Select a product"
                        popupHeight="300px"
                        width="250px"
                        allowFiltering={true}
                        noRecordsTemplate='<div><div id="nodata"> No matched item</div>'
                        filtering={filteringData}
                        created={getEmbeddingsData}
                    >
                    </ComboBoxComponent>
                </div>
                <div id="action-description">
                    <p>
                        This demo highlights the advanced capabilities of the Syncfusion React ComboBox, specifically focusing on
                        the Semantic Search feature:
                    </p>
                    <p>
                        <strong>Semantic Search:</strong> Users can search for items based on the meaning and context of their queries,
                        rather than relying solely on exact keyword matches. This AI-driven feature enhances search accuracy by
                        understanding the intent behind user inputs, delivering more relevant and intuitive results. It is especially
                        beneficial in applications where finding the right item quickly is crucial.
                    </p>
                    <p>
                        This feature makes the Syncfusion React ComboBox a powerful tool for creating more intelligent and
                        responsive search interfaces.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react' aria-label="Navigate to explore the syncfusion JavaScript AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>
                        <strong>Semantic Search:</strong> The Semantic Search feature empowers users to find items by interpreting the
                        context and meaning of their search queries. Unlike traditional search methods that depend on exact keyword
                        matches, Semantic Search understands the intent behind the query, offering more accurate and relevant results.
                        This enhances user experience, particularly in complex or large datasets, by making search interactions more
                        intuitive and effective.
                    </p>
                </div>
            </div>
        </div>
    )
}

export {ComboBoxSemanticSearch};