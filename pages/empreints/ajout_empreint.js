import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useQueryClient, useMutation } from 'react-query';
import Link from 'next/link';

import { useRouter } from 'next/router';
import styles from '../../styles/service_css.module.css';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

const FormLayoutDemo = () => {




    const [idLivre, setIdLivre] = useState('');
    const [idAdherant, setIdAdherant] = useState('');
    const [dated, setDated] = useState('');
    const [datef, setDatef] = useState('');
    const username = "achref";
    const password = "elpsycongroo";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (idAdherant && idLivre && dated && datef) {
                const parts = dated.split('-');
                const year = parseInt(parts[0]);
                const month = parseInt(parts[1]) - 1;
                const day = parseInt(parts[2]);
                const dateI = new Date(year, month, day);
                    const partsF = datef.split('-');
                    const yearF = parseInt(partsF[0]);
                    const monthF = parseInt(partsF[1]) - 1;
                    const dayF = parseInt(partsF[2]);
                    const dateF = new Date(yearF, monthF, dayF);

                const finalResponse = await fetch('http://localhost:8080/Emprunts', {
                    method: 'POST',
                    body: JSON.stringify( { idLivre, idAdherant, 'dated':dateI, 'datef':dateF }),
                    credentials: 'include',
                    headers: {
                        "Authorization": `Basic ${encodedCredentials}`,
                        "Content-Type": "application/json",

                    }

                });
                if (finalResponse.ok) {
                    router.push('/empreints')
                }

            }
        } catch (error) {
            console.log(error);
        }
    };


    const router = useRouter();
    return (
        <div className="grid">
            <div className="col-12 ">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Ajouter Empreint:</h5>
                        <div className="field">
                            <label htmlFor="idAdherant">Id Adherant</label>
                            <InputText onChange={(e) => setIdAdherant(e.target.value)} id="idadherant" name="adherant" type="text" />
                        </div>

                        <div className="field ">
                            <label htmlFor="idLivre">Id Livre</label>
                            <InputTextarea id="idLivre" name="idLivre" onChange={(e) => setIdLivre(e.target.value)} rows="4" />
                        </div>

                        <div className="field">
                            <label htmlFor="dated">Date Debut</label>
                            <InputTextarea id="dated" name="dated" onChange={(e) => setDated(e.target.value)} rows="4" />
                        </div>

                        <div className="field">
                            <label htmlFor="datenaiss">Date Fin</label>
                            <InputTextarea id="datef" name="datef" onChange={(e) => setDatef(e.target.value)} rows="4" />
                        </div>

                        <Button className={styles.submit_button} type="submit" label="Ajouter" icon="pi pi-check" />
                    </form>
                </div>
            </div>
        </div>
    );

};

export default FormLayoutDemo;
