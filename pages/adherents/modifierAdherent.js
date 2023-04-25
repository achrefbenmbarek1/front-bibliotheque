import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useQueryClient, useMutation } from 'react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/service_css.module.css';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
const FormLayoutDemo = ({ data }) => {
    ///////////////////////////////////////////


    const router = useRouter();
    const [nom, setNom] = useState(data.nom);
    const [prenom, setPrenom] = useState(data.prenom);
    const [addr, setAddr] = useState(data.addr);
    const [datenaiss, setDateNaiss] = useState(data.datenaiss);
    const [cin, setCin] = useState(data.cin);
    const username = "achref";
    const password = "elpsycongroo";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const _id = data._id;
    //     const formData = new FormData();
    //     console.log('images 9bal formdata', images);

    //     if (Array.isArray(images)) {
    //         images.forEach((image) => {
    //             formData.append('images', image);
    //         });
    //     }

    //     formData.append('titre', titre);
    //     formData.append('description', description);
    //     formData.append('contenu', contenu);
    //     console.log('houni images', images);

    //     try {
    //         if (description !== '' && titre !== '' && contenu !== '') {
    //             const response = await fetch('http://localhost:5050/article/update/' + _id, {
    //                 method: 'PUT',
    //                 body: formData,
    //                 credentials: 'include'
    //             });
    //             console.log(response);
    //             router.push('/articles');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     console.log(FormData);
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (nom && prenom && addr && datenaiss && cin) {
                const response = await fetch('http://localhost:8080/Adherents/' + data.idadherant, {
                    method: 'PUT',
                    body: JSON.stringify({ nom, prenom, addr, datenaiss, cin }),
                    credentials: 'include',
                    headers: {
                        "Authorization": `Basic ${encodedCredentials}`,
                        "Content-Type": "application/json",
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

    return (
        <div className="grid">
            <div className="col-12 ">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Modifier Adherent</h5>
                        <div className="field">
                            <label htmlFor="nom">Nom</label>
                            <InputText onChange={(e) => setNom(e.target.value)} id="nom" name="nom" type="text" defaultValue={data.nom} />
                        </div>

                        <div className="field ">
                            <label htmlFor="prenom">Prenom</label>
                            <InputTextarea id="prenom" name="prenom" onChange={(e) => setPrenom(e.target.value)} rows="4" defaultValue={data.prenom} />
                        </div>

                        <div className="field">
                            <label htmlFor="addr">addresse</label>
                            <InputTextarea id="addr" name="addr" onChange={(e) => setAddr(e.target.value)} rows="4" defaultValue={data.addr} />
                        </div>

                        <div className="field">
                            <label htmlFor="datenaiss">Date de naissance</label>
                            <InputTextarea id="addr" name="addr" onChange={(e) => setDateNaiss(e.target.value)} rows="4" defaultValue={data.datenaiss} />
                        </div>

                        <div className="field">
                            <label htmlFor="cin">cin</label>
                            <InputTextarea id="cin" name="cin" onChange={(e) => setCin(e.target.value)} rows="4" defaultValue={data.cin} />
                        </div>

                        <Button className={styles.submit_button} type="submit" label="Modifier" icon="pi pi-check" />
                    </form>
                </div>
            </div>
        </div>
    );
};

FormLayoutDemo.getInitialProps = async ({ query }) => {
    const data = query;

    return { data };
};

export default FormLayoutDemo;
