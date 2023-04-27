import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router'
import { Buffer } from 'buffer';

const PanelDemo = () => {
    const router = useRouter();
    // const menu1 = useRef(null);
    const username = "achref";
    const password = "elpsycongroo";
    const [bookCardsContent, setBookCardsContent] = useState([]);
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:8080/';

    useEffect(() => {
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'books', {
            headers: {
                "Authorization": `Basic ${encodedCredentials}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setBookCardsContent(data);
                console.log("mil use effect", data);
            })
            .catch((error) => console.log(error));
    }, []);

    const editCard = (cardContent) => {
        const { idLivre, titre, imageDeCouverture, name, auteur, genre, langue, prix, nbCopie } = cardContent;
        router.push({
            pathname: '/services/modifierService',
            query: { idLivre, titre, imageDeCouverture, name, auteur, genre, langue, prix, nbCopie }
        })
    };

    const readCard = (cardContent) => {
        const { idLivre, titre, imageDeCouverture, name, auteur, genre, langue, prix, nbCopie } = cardContent;
        router.push({
            pathname: '/services/singleService',
            query: { idLivre, titre, imageDeCouverture, name, auteur, genre, langue, prix, nbCopie}
        })
    };

    const removeCard = (id) => {
        console.log('hedha itype', typeof id);
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'books/' + id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Authorization": `Basic ${encodedCredentials}`
            }

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`http error, status : ${response.status}`);
                }
                console.log('serviceSuccessfully deleted');
            })
            .catch((error) => console.log(error));
        setBookCardsContent(bookCardsContent.filter((card) => card.idLivre !== id));
    };

    if (bookCardsContent.length === 0) {
        return <div>loading...</div>;
    }
    return (
        <div className="grid">
            {bookCardsContent.map((cardContent, index) => {
                console.log(cardContent);

                return (
                    <div key={cardContent.idLivre} className="card col-12 md:col-6">
                        <Fieldset legend={cardContent.idLivre} toggleable>
                            <img src={PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'images/' + cardContent.imageDeCouverture} style={{ height: 215.1, width: 322.5 }} className="w-6" />
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{"nombre de copie disponible: " + cardContent.nbCopie }</p>
                        </Fieldset>
                        <Button label="Consulter" className="p-button-success m-4" onClick={() => readCard(cardContent)} />
                        <Button label="Modifier" className="m-4" onClick={() => editCard(cardContent)} />
                        <Button label="Supprimer" className="p-button-danger m-4" onClick={() => removeCard(cardContent.idLivre)} />

                    </div>
                );
            })}

        </div>
    );
};

export default withRouter(PanelDemo);









