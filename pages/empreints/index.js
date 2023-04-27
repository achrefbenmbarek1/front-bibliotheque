import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router';

const PanelDemo = () => {
    const router = useRouter();
    const menu1 = useRef(null);
    const [projetCardsContent, setProjetCardsContent] = useState([]);
    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:8080/';
    const username = "achref";
    const password = "elpsycongroo";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');


    useEffect(() => {
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'Emprunts', {
            headers: {
                "Authorization": `Basic ${encodedCredentials}`
            }

        })
            .then((response) => response.json())
            .then((data) => {
                setProjetCardsContent(data);
            })
            .catch((error) => console.log(error));
    }, []);

    // const editCard = (cardContent) => {
    //     const { id } = cardContent;
    //     router.push({
    //         pathname: '/empreints/modifierEmpreint',
    //         query: { id }
    //     })
    // };

    const readCard = (cardContent) => {
        const { id } = cardContent;

        router.push({
            pathname: '/empreints/singleEmpreint',
            query: { id }
        })
    };

    const removeCard = (id) => {
        console.log(id);
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'Emprunts/' + id, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`http error, status : ${response.status}`);
                }
                console.log('projet Successfully deleted');
            })
            .catch((error) => console.log(error));
        setProjetCardsContent(projetCardsContent.filter((card) => card.id !== id));
    };

    if (projetCardsContent.length === 0) {
        return <div>loading...</div>;
    }
    return (
        <div className="grid">
            {projetCardsContent.map((cardContent, index) => {
                const json_data = JSON.stringify(cardContent);
                console.log(json_data);

                return (
                    <div key={cardContent.id} className="card col-12 md:col-6">
                        <Fieldset legend={cardContent.id} toggleable>
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{"livre nom: " + cardContent.livre?.titre}</p>
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{"adhrant nom: " + cardContent.adherent?.nom}</p>
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{"date debut: " + cardContent.dated}</p>
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{"date fin: " + cardContent.datef}</p>
                        </Fieldset>
                        <Button label="Consulter" className="p-button-success m-4" onClick={() => readCard(cardContent)} />
                        {/* <Button label="Modifier" className="m-4" onClick={() => editCard(cardContent)} /> */}
                        <Button label="Supprimer" className="p-button-danger m-4" onClick={() => removeCard(cardContent.id)} />

                    </div>
                );
            })}

        </div>
    );
};

export default withRouter(PanelDemo);
