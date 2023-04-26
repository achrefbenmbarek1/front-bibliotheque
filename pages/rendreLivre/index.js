import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styles from '../../styles/service_css.module.css'
import { useRouter } from 'next/router';

const RendreLivre = () => {
    const [idLivre,setIdLivre] = useState("");
    const username = "achref";
    const password = "elpsycongroo";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
    const router =useRouter();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (idLivre) {
                const response = await fetch('http://localhost:8080/books/rendreLivre/'+idLivre,
                    {
                        method: 'PUT',
                        body: JSON.stringify({ }),
                        // credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Basic ${encodedCredentials}`

                        }

                    });
                if (response.ok) {
                    router.push('/services')
                }
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Rendre Livre</h5>
                        <div className="field">
                            <label htmlFor="idLivre ">idLivre</label>
                            <InputText onChange={(e) => setIdLivre(e.target.value)} id="idLivre" name="idLivre" type="text" defaultValue={idLivre} />
                        </div>
                        <Button className={styles.submit_button} type="submit" label="rendreLivre" icon="pi pi-check" />

                    </form>
                </div>



            </div>
        </div>
    );
}
export default RendreLivre;
