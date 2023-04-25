import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router'

const PanelDemo = () => {
    const router = useRouter();
    const menu1 = useRef(null);
    const [articleCardsContent, setArticleCardsContent] = useState([]);
    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:8080/';
    const username = "achref";
    const password = "elpsycongroo";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');


    useEffect(() => {
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'Adherents', {
            headers: {
                "Authorization": `Basic ${encodedCredentials}`
            }

        })
            .then((response) => response.json())
            .then((data) => {
                setArticleCardsContent(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const editCard = (cardContent) => {
        const { idadherant, nom, prenom, cin, addr, datenaiss  } = cardContent;
        router.push({
            pathname: '/adherents/modifierAdherent',
            query: { idadherant, nom, prenom, cin, addr, datenaiss  }
        })
    };

    const readCard = (cardContent) => {
        const { idadherant, nom, prenom, cin, addr, datenaiss  } = cardContent;

        router.push({
            pathname: '/adherents/singleAdherent',
            query: { idadherant, nom, prenom, cin, addr, datenaiss  }
        })
    };

    const removeCard = (id) => {
        console.log(id);
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'Adherents/' + id, {
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
                console.log('articleSuccessfully deleted');
            })
            .catch((error) => console.log(error));
        setArticleCardsContent(articleCardsContent.filter((card) => card.idadherant !== id));
    };

    if (articleCardsContent.length === 0) {
        return <div>loading...</div>;
    }
    return (
        <div className="grid">
            {articleCardsContent.map((cardContent, index) => {
                const json_data = JSON.stringify(cardContent);
                console.log(json_data)

                return (
                    <div key={cardContent.idadherant} className="card col-12 md:col-6">
                        <Fieldset legend={cardContent.idadherant} toggleable>
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{"cin: " + cardContent.cin}</p>
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{"nom: " + cardContent.nom}</p>
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{"prenom: " + cardContent.prenom}</p>
                        </Fieldset>

                        <Button label="Consulter" className="p-button-success m-4" onClick={() => readCard(cardContent)} />
                        <Button label="Modifier" className="m-4" onClick={() => editCard(cardContent)} />
                        <Button label="Supprimer" className="p-button-danger m-4" onClick={() => removeCard(cardContent.idadherant)} />

                    </div>
                );
            })}

        </div>
    );
};

export default withRouter(PanelDemo);









