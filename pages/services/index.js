import React, { useEffect, useRef, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Password } from 'primereact/password';
import { Menu } from 'primereact/menu';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { withRouter } from 'next/router'

const PanelDemo = () => {
    const router = useRouter();
    const menu1 = useRef(null);
    const [bookCardsContent, setBookCardsContent] = useState([]);
    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:8080/';

    useEffect(() => {
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'books')
            .then((response) => response.json())
            .then((data) => {
                setBookCardsContent(data);
                console.log("mil use effect", data);
            })
            .catch((error) => console.log(error));
    }, []);

    const editCard = (cardContent) => {
        const {_id,titre,image,description}=cardContent;
        router.push({
            pathname: '/services/modifierService',
            query: {_id,titre,image,description}
        })
    };

    const readCard = (cardContent) => {
        const {_id,titre,image,description}=cardContent;
        console.log("image . current in index", image);
        router.push({
            pathname: '/services/singleService',
            query: {_id,titre,image,description}
        })
    };

    const removeCard = (id) => {
        console.log(id);
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'service/' + id, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`http error, status : ${response.status}`);
                }
                console.log('serviceSuccessfully deleted');
            })
            .catch((error) => console.log(error));
        setBookCardsContent(bookCardsContent.filter((card) => card._id !== id));
    };

    const toolbarItems = [
        {
            label: 'Save',
            icon: 'pi pi-check'
        },
        {
            label: 'Update',
            icon: 'pi pi-sync'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
        {
            label: 'Home Page',
            icon: 'pi pi-home'
        }
    ];

    const toolbarLeftTemplate = () => {
        return (
            <>
                <Button label="New" icon="pi pi-plus" style={{ marginRight: '.5em' }} />
                <Button label="Open" icon="pi pi-folder-open" className="p-button-secondary" />

                <i className="pi pi-bars p-toolbar-separator" style={{ marginRight: '.5em' }}></i>

                <Button icon="pi pi-check" className="p-button-success" style={{ marginRight: '.5em' }} />
                <Button icon="pi pi-trash" className="p-button-warning" style={{ marginRight: '.5em' }} />
                <Button icon="pi pi-print" className="p-button-danger" />
            </>
        );
    };
    const toolbarRightTemplate = <SplitButton label="Options" icon="pi pi-check" model={toolbarItems} menuStyle={{ width: '12rem' }}></SplitButton>;
    const cardHeader = (
        <div className="flex align-items-center justify-content-between mb-0 p-3 pb-0">
            <h5 className="m-0">Card</h5>
            <Button icon="pi pi-plus" className="p-button-text" onClick={(event) => menu1.current.toggle(event)} />
            <Menu
                ref={menu1}
                popup
                model={[
                    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                    { label: 'Remove', icon: 'pi pi-fw pi-minus' },
                    { label: 'Update', icon: 'pi pi-fw pi-sync' }
                ]}
            />
        </div>
    );
    if (bookCardsContent.length === 0) {
        return <div>loading...</div>;
    }
    return (
        <div className="grid">
            {bookCardsContent.map((cardContent, index) => {
                console.log("it's me mario",cardContent.imageDeCouverture)
                // const json_data = JSON.stringify(cardContent);
                // console.log(json_data)

                return (
                    <div key={cardContent._id} className="card col-12 md:col-6">
                        <Fieldset legend={cardContent.titre} toggleable>
                            <img src={PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'images/' + cardContent.imageDeCouverture} style={{ height: 215.1, width: 322.5 }} className="w-6" />
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{cardContent.prix}</p>
                        </Fieldset>
                            <Button label="Consulter" className="p-button-success m-4" onClick={() => readCard(cardContent)} />
                            <Button label="Modifier" className="m-4" onClick={() => editCard(cardContent)} />
                            <Button label="Supprimer" className="p-button-danger m-4" onClick={() => removeCard(cardContent._id)} />

                    </div>
                );
            })}

        </div>
    );
};

export default withRouter (PanelDemo);









