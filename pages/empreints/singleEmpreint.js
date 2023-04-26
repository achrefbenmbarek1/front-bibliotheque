import React from 'react';
import Gallery from '../../demo/components/Gallery';

const EmptyPage = ({ data }) => {


    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h1>general:</h1>
                    <h3>id: {data?.id}</h3>
                    <h3>date debut: {data?.dated}</h3>
                    <h3>date fin: {data?.datef}</h3>
                    <h1>Livre:</h1>
                    <h3>id: {data?.livre?.idLivre}</h3>
                    <h3>Titre: {data?.livre?.titre}</h3>
                    <h3>Nom: {data?.livre?.name}</h3>
                    <h3>Auteur: {data?.livre?.auteur}</h3>
                    <h3>genre: {data?.livre?.genre}</h3>
                    <h3>prix: {data?.livre?.prix}</h3>
                    <h3>nombre de copies disponibles: {data?.livre?.nbCopie}</h3>
                    <h3>langue: {data?.livre?.langue}</h3>
                    <h3>image de couverture: {data?.livre?.imageDeCouverture}</h3>
                    <h1>Adherant:</h1>
                    <h3>addresse: {data?.adherent?.addr}</h3>
                    <h3>cin: {data?.adherent?.cin}</h3>
                    <h3>datenaiss: {data?.adherent?.datenaiss}</h3>
                    <h3>id: {data?.adherent?.idadherant}</h3>
                    <h3>nom: {data?.adherent?.nom}</h3>
                    <h3>prenom: {data?.adherent?.prenom}</h3>

                </div>
            </div>
        </div>
    );
};

EmptyPage.getInitialProps = async ({ query }) => {
    const username = "achref";
    const password = "elpsycongroo";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
    const response = await fetch("http://localhost:8080/Emprunts/" + query.id, {
        headers: {
            "Authorization": `Basic ${encodedCredentials}`,

        }
    })
    const data = await response.json();
    console.log("hedhi idata", data)

    return { data };
};


export default EmptyPage;






