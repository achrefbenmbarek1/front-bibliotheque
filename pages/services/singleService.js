import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EmptyPage = () => {
    const router = useRouter();
    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:8080/';
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Titre Livre:</h3>
                    <h5>{router.query.titre}</h5>
                    <h3>nom:</h3>
                    <h5>{router.query.name}</h5>
                    <h3>auteur:</h3>
                    <h5>{router.query.auteur}</h5>
                    <h3>genre:</h3>
                    <h5>{router.query.genre}</h5>
                    <h3>langue:</h3>
                    <h5>{router.query.langue}</h5>
                    <h3>prix:</h3>
                    <h5>{router.query.prix}</h5>
                    <h3>nombre de copies disponibles:</h3>
                    <h5>{router.query.nbCopie}</h5>
                    <h3>image:</h3>
                    <img style={{maxHeight:"300px"}}src={PROTOCOLANDHOSTNAMEPARTOFTHEURL+"images/"+router.query.imageDeCouverture} ></img>
                </div>

            </div>
        </div>
    );
};

export default EmptyPage;
