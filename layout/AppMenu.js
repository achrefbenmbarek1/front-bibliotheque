import getConfig from 'next/config';
import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { useRouter } from 'next/router';
import { removeCookie } from '../demo/utils/cookieUtils';
// import Cookies from 'js-cookie';

const AppMenu = () => {
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const handleLogout = async () => {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            removeCookie('authenticated');
            router.push('/');
        }
    }
    const model = [

        {
            icon: 'pi pi-fw pi-home',
            label: 'Dashboard',
            items: [
                {
                    label: 'Adherent ',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Ajouter adherant',
                            icon: 'pi pi-fw pi-plus',
                            to: '/adherents/ajout_adherent'
                        },
                        {
                            label: 'Tout les Adherants',
                            icon: 'pi pi-fw pi-search',
                            to: '/adherents'
                        }
                    ]
                },
                {
                    label: 'Livres ',
                    icon: 'pi pi-fw pi-id-card',
                    items: [
                        {
                            label: 'Ajouter Livre',
                            icon: 'pi pi-fw pi-plus',
                            to: '/services/ajout_service'
                        },
                        {
                            label: 'Tout les Livres',
                            icon: 'pi pi-fw pi-search',
                            to: '/services'
                        }
                    ]
                },

                {
                    label: 'Empreint ',
                    icon: 'pi pi-fw pi-sun',
                    items: [
                        {
                            label: 'Ajouter Empreint',
                            icon: 'pi pi-fw pi-plus',
                            to: '/empreints/ajout_empreint'
                        },
                        {
                            label: 'Tout les Empreints',
                            icon: 'pi pi-fw pi-search',
                            to: '/empreints'
                        }
                    ]
                },
                { label: 'Rendre livre', icon: 'pi pi-fw pi-plus', to: '/rendreLivre' },

                { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: handleLogout }
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
