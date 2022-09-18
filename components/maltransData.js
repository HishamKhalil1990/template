import {useState} from 'react';
import axios from 'axios';

export default function MaltransData(props){

    function FileUpload(){
        const [selectedFile, setSelectedFile] = useState();
        const [isSelected, setIsSelected] = useState(false);
    
        const changeHandler = (event) => {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);
        };
    
        const handleSubmission = () => {
            const formData = new FormData();
            formData.append('File', selectedFile);
            // console.log(selectedFile)
            fetch(
                '/api',
                {
                    method: 'POST',
                    body: formData,
                }
            )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };
    
        return(
            <div>
                <input type="file" name="file" onChange={changeHandler} />
                {isSelected ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}
                <div>
                    <button onClick={handleSubmission}>Submit</button>
                </div>
            </div>
        )
    }

    return(
        <div>
            <FileUpload/>
        </div>
    )
}