import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { useRouter } from 'next/router';
import styles from '../../styles/service_css.module.css';


const FormLayoutDemo = () => {



    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [addr, setAddr] = useState('');
    const [datenaiss, setDateNaiss] = useState('');
    const [cin, setCin] = useState('');
    const username = "achref";
    const password = "elpsycongroo";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (nom && prenom && addr && datenaiss && cin) {
                    const parts = datenaiss.split('-');
                    const year = parseInt(parts[0]);
                    const month = parseInt(parts[1]) - 1;
                    const day = parseInt(parts[2]);
                    const date = new Date(year, month, day);
                    console.log(date);
                const response = await fetch('http://localhost:8080/Adherents', {

                    method: 'POST',
                    body: JSON.stringify({ nom, prenom, addr, 'datenaiss':date, cin }),
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${encodedCredentials}`,

                    }

                });
                console.log(response);
                if (response.ok) {
                    router.push('/adherents')

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
                        <h5>Ajouter Adherent</h5>
                        <div className="field">
                            <label htmlFor="nom">Nom</label>
                            <InputText onChange={(e) => setNom(e.target.value)} id="nom" name="nom" type="text" />
                        </div>

                        <div className="field ">
                            <label htmlFor="prenom">Prenom</label>
                            <InputTextarea id="prenom" name="prenom" onChange={(e) => setPrenom(e.target.value)} rows="4" />
                        </div>

                        <div className="field">
                            <label htmlFor="addr">addresse</label>
                            <InputTextarea id="addr" name="addr" onChange={(e) => setAddr(e.target.value)} rows="4" />
                        </div>

                        <div className="field">
                            <label htmlFor="datenaiss">Date de naissance</label>
                            <InputTextarea id="addr" name="addr" onChange={(e) => setDateNaiss(e.target.value)} rows="4" />
                        </div>

                        <div className="field">
                            <label htmlFor="cin">cin</label>
                            <InputTextarea id="cin" name="cin" onChange={(e) => setCin(e.target.value)} rows="4" />
                        </div>

                        <Button className={styles.submit_button} type="submit" label="Ajouter" icon="pi pi-check" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
