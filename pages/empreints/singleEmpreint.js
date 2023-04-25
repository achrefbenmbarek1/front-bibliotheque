import React from 'react';
import Gallery from '../../demo/components/Gallery';

const EmptyPage = ({ data }) => {

    const PROTOCOL_AND_HOSTNAME_PART_OF_THE_URL = 'http://localhost:5050';

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Titre Projet:</h3>
                    <h5>{data.titre}</h5>
                    <h3>Description:</h3>
                    <h5>{data.description}</h5>
                    <h3>Adresse:</h3>
                    <h5>{data.adresse}</h5>
                    <h3>Production Anuelle:</h3>
                    <h5>{data.productionAnuelle}</h5>
                    <h3>type:</h3>
                    <h5>{data.type}</h5>
                    <Gallery 
                        imagePaths={Array.isArray(data.images) ? 
                            data.images.map((imageName) => `${ PROTOCOL_AND_HOSTNAME_PART_OF_THE_URL}/imagesProjet/${imageName}`): 
                            `${PROTOCOL_AND_HOSTNAME_PART_OF_THE_URL}/imagesProjet/${data.images}`}>

                    </Gallery>
                    <video controls>
                        <source src={`${PROTOCOL_AND_HOSTNAME_PART_OF_THE_URL}/videosProjet/${data.video}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

EmptyPage.getInitialProps = async ({ query }) => {
    const data = query;

    return { data };
};


export default EmptyPage;






