import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useQueryClient, useMutation } from 'react-query';
import Link from 'next/link';

import { useRouter } from 'next/router'

import styles from '../../styles/service_css.module.css'

import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

const FormLayoutDemo = () => {
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
    //     console.log("hani fil upload");

    //     e.files.forEach((file) => {
    //         _totalSize += file.size || 0;
    //     });

    //     setTotalSize(_totalSize);
    //     toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    //     const formData = new FormData();
    //     if (e.files && e.files[0]) {
    //         formData.append('file', e.files[0]);
    //     }
    //     // if (e.files && e.files[0]) {
    //     //     formData.append('file', e.files[0]);
    //     //     fetch('/books/upload', {
    //     //         method: 'POST',
    //     //         body: formData
    //     //     })
    //     //         .then(response => {
    //     //             if (!response.ok) {
    //     //                 throw new Error('Upload failed with status ' + response.status);
    //     //             }
    //     //             console.log('Upload success:', response);
    //     //         })
    //     //         .catch(error => {
    //     //             console.error('Upload error:', error);
    //     //         });

    //     // }
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
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
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




    const [imageDeCouverture, setImageDeCouverture] = useState(null);
    const [titre, setTitre] = useState('');
    const [name, setName] = useState('');
    const [prix, setPrix] = useState(0);
    const [auteur, setAuteur] = useState('');
    const [langue, setLangue] = useState('');
    const [genre, setGenre] = useState('');
    const [imageName, setImageName] = useState('');
    const [nbCopie, setNbCopie] = useState('');
    const username = "achref";
    const password = "elpsycongroo";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const regex = /^\d+(\.\d+)?$/;

            if (imageName && titre && regex.test(prix) && auteur && langue && genre && name) {
                const response = await fetch('http://localhost:8080/books',
                    {
                        method: 'POST',
                        body: JSON.stringify({ 'imageDeCouverture': imageName, titre, name, auteur, genre, langue, "prix": parseFloat(prix), "nbCopie":parseInt(nbCopie) }),
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

    const router = useRouter()
    // const onUpload = () => {
    //     toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    // };
    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Ajouter Livre</h5>
                        <div className="field">
                            <label htmlFor="titre">titre</label>
                            <InputText onChange={(e) => setTitre(e.target.value)} id="titre" name="titre" type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="nom">nom </label>
                            <InputText onChange={(e) => setName(e.target.value)} id="nom" name="nom" type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="auteur">auteur </label>
                            <InputText onChange={(e) => setAuteur(e.target.value)} id="auteur" name="auteur" type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="genre">genre </label>
                            <InputText onChange={(e) => setGenre(e.target.value)} id="genre" name="genre" type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="langue">langue </label>
                            <InputText onChange={(e) => setLangue(e.target.value)} id="langue" name="langue" type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="nbCopie">nombre de copies disponible </label>
                            <InputText onChange={(e) => setNbCopie(e.target.value)} id="nbCopie" name="nbCopie" type="text" />
                        </div>

                        <div className="field">
                            <label htmlFor="prix">prix </label>
                            <InputText onChange={(e) => setPrix(e.target.value)} id="prix" name="prix" type="text" />
                        </div>
                        {/* <div className="field col-12"> */}
                        {/*     <label htmlFor="description">Description</label> */}
                        {/*     <InputTextarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} rows="4" /> */}

                        {/* </div> */}



                        <div className="field col-12 ">
                            <label >Images</label>
                            <div>

                                <Toast ref={toast}></Toast>

                                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                <FileUpload ref={fileUploadRef} name="image" accept="image/*" maxFileSize={3000000}
                                    /* onUpload={onTemplateUpload} */ onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                                    /* method="POST" url="http://localhost:8080/books/upload" */
                                    customUpload={true}
                                    uploadHandler={invoiceUploadHandler} />
                            </div>
                        </div>

                        <Button className={styles.submit_button} type="submit" label="Ajouter" icon="pi pi-check" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
