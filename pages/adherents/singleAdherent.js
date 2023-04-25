import React from 'react';
import Gallery from '../../demo/components/Gallery';

const EmptyPage = ({data}) => {
    const PROTOCOL_AND_HOSTNAME_PART_OF_THE_URL = 'http://localhost:5050';
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>cin:</h3>
                    <h5>{data.cin}</h5>
                    <h3>nom:</h3>
                    <h5>{data.nom}</h5>
                    <h3>prenom:</h3>
                    <h5>{data.prenom}</h5>
                    <h3>addresse:</h3>
                    <h5>{data.addr}</h5>
                    <h3>date naissance:</h3>
                    <h5>{data.datenaiss}</h5>

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






