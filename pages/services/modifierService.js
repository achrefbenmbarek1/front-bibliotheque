import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import styles from '../../styles/service_css.module.css'

import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
const FormLayoutDemo = ({ data }) => {
    ///////////////////////////////////////////

    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;

        });

        setTotalSize(_totalSize);

        setImageDeCouverture(files[0])

    };

    const invoiceUploadHandler = ({ files }) => {
        console.log("files", files);
        const formData = new FormData();
        console.log("houwa wala le", files[0]);
        formData.append('file', files[0]);
        fetch('http://localhost:8080/books/upload', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": `Basic ${encodedCredentials}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }
                return response.text();
            }).then(responseText => {
                console.log("hedha ili hachti bih", responseText);
                setImageName(responseText);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                throw error;
            });

        // const fileReader = new FileReader();
        // fileReader.onload = (e) => {
        //     uploadInvoice(e.target.result);
        // };
        // fileReader.readAsDataURL(file);
    };


    // const onTemplateUpload = (e) => {
    //     let _totalSize = 0;

    //     e.files.forEach((file) => {
    //         _totalSize += file.size || 0;
    //     });

    //     setTotalSize(_totalSize);
    //     toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    // };

    const onTemplateRemove = (file, callback) => {
        console.log("image in remove ", imageDeCouverture)
        console.log("file in remove ", file);
        setImageDeCouverture(undefined);

        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        console.log('mil item template', file);
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name ?? file} role="presentation" src={file.objectURL ?? `http://localhost:5050/imageService/${file}`} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        console.log('ena fil empty template')
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    /////////////////////////////////////

    // query: { idLivre, titre, imageDeCouverture, name, auteur, genre, langue, prix }

    const router = useRouter()
    const username = "achref";
    const password = "elpsycongroo";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
    const [imageDeCouverture, setImageDeCouverture] = useState(data.imageDeCouverture);
    const [titre, setTitre] = useState(data.titre);
    const [name, setName] = useState(data.name);
    const [auteur, setAuteur] = useState(data.auteur);
    const [genre, setGenre] = useState(data.genre);
    const [langue, setLangue] = useState(data.langue);
    const [prix, setPrix] = useState(data.prix);
    const [imageName, setImageName] = useState('');
    const [nbCopie, setNbCopie] = useState(data.nbCopie);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const regex = /^\d+(\.\d+)?$/;

            if (titre && regex.test(prix) && auteur && langue && genre && name && regex.test(nbCopie)) {
                console.log("mil submit imta3 lupdate", imageDeCouverture)
                console.log("mil submit imta3 lupdate route", data.imageDeCouverture)
                console.log("mil submit imta3 imageName", imageName)

                const response = await fetch('http://localhost:8080/books/' + data.idLivre,
                    {
                        method: 'PUT',
                        body: JSON.stringify({ 'imageDeCouverture': imageName ? imageName : data.imageDeCouverture, titre, name, auteur, genre, langue, "prix": parseFloat(prix), "nbCopie":parseInt(nbCopie) }),
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Basic ${encodedCredentials}`

                        }

                    });
                console.log(response);
                if (response.ok) {
                    router.push('/services')
                }
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
                        <h5>Modifier Livre</h5>
                        <div className="field">
                            <label htmlFor="nbCopie ">nombre de copies</label>
                            <InputText onChange={(e) => setNbCopie(e.target.value)} id="nbCopie" name="nbCopie" type="text" defaultValue={data.nbCopie} />
                        </div>

                        <div className="field">
                            <label htmlFor="titre">titre</label>
                            <InputText onChange={(e) => setTitre(e.target.value)} id="titre" name="titre" type="text" defaultValue={data.titre} />
                        </div>

                        <div className="field ">
                            <label htmlFor="auteur">auteur</label>
                            <InputTextarea onChange={(e) => setAuteur(e.target.value)} id="auteur" name="auteur" rows="4" defaultValue={data.auteur} />

                        </div>
                        <div className="field ">
                            <label htmlFor="genre">genre</label>
                            <InputTextarea onChange={(e) => setGenre(e.target.value)} id="genre" name="genre" rows="4" defaultValue={data.genre} />

                        </div>
                        <div className="field ">
                            <label htmlFor="langue">langue</label>
                            <InputTextarea onChange={(e) => setLangue(e.target.value)} id="langue" name="langue" rows="4" defaultValue={data.langue} />

                        </div>
                        <div className="field ">
                            <label htmlFor="prix">prix</label>
                            <InputTextarea onChange={(e) => setPrix(e.target.value)} id="prix" name="prix" rows="4" defaultValue={data.prix} />

                        </div>
                        <div className="field ">
                            <label htmlFor="nom">name</label>
                            <InputTextarea onChange={(e) => setName(e.target.value)} id="nom" name="nom" rows="4" defaultValue={data.name} />

                        </div>


                        <div className="field col-12 ">
                            <label >Image</label>
                            <div>
                                <Toast ref={toast}></Toast>

                                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                <FileUpload ref={fileUploadRef} name="image" accept="image/*" maxFileSize={3000000}
                                    /* onUpload={onTemplateUpload} */ onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                                    customUpload={true} uploadHandler={invoiceUploadHandler} />
                            </div>
                        </div>

                        <Button className={styles.submit_button} type="submit" label="Valider" icon="pi pi-check" />

                    </form>
                </div>



            </div>
        </div>
    );
};


FormLayoutDemo.getInitialProps = async ({ query }) => {
    // Fetch data using the query parameter
    const data = query;

    // Return the data as props
    return { data };
};

export default FormLayoutDemo;
