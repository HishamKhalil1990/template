import {useState} from 'react';

export default function MaltransData(props){

    function FileUpload(){
        const [selectedFileOne, setSelectedFileOne] = useState();
        const [selectedFileTwo, setSelectedFileTwo] = useState();
        const [selectedFileThree, setSelectedFileThree] = useState();
        const [selectedFileFour, setSelectedFileFour] = useState();
        const [isSelectedOne, setIsSelectedOne] = useState(false);
        const [isSelectedTwo, setIsSelectedTwo] = useState(false);
        const [isSelectedThree, setIsSelectedThree] = useState(false);
        const [isSelectedFour, setIsSelectedFour] = useState(false);
    
        const changeHandler = (event,fileNo) => {
            switch(fileNo){
                case 1:
                    setSelectedFileOne(event.target.files[0]);
                    setIsSelectedOne(true);
                    break;
                case 2:
                    setSelectedFileTwo(event.target.files[0]);
                    setIsSelectedTwo(true);
                    break;
                case 3:
                    setSelectedFileThree(event.target.files[0]);
                    setIsSelectedThree(true);
                    break;
                case 4:
                    setSelectedFileFour(event.target.files[0]);
                    setIsSelectedFour(true);
                    break;
                default:
                    break;
            }
        };
    
        const handleSubmission = () => {
            const formData = new FormData();
            if(isSelectedOne){
                formData.append('FileOne', selectedFileOne);
            }else{
                formData.append('FileOne', 'empty');
            }
            if(isSelectedTwo){
                formData.append('FileTwo', selectedFileTwo);
            }
            else{
                formData.append('FileTwo', 'empty');
            }
            if(isSelectedThree){
                formData.append('FileThree', selectedFileThree);
            }
            else{
                formData.append('FileThree', 'empty');
            }
            if(isSelectedFour){
                formData.append('FileFour', selectedFileFour);
            }
            else{
                formData.append('FileFour', 'empty');
            }
            // console.log(selectedFileOne)
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
                <input type="file" name="file" onChange={e => changeHandler(e,1)} />
                {isSelectedOne ? (
                    <div>
                        <p>Filename: {selectedFileOne.name}</p>
                        <p>Filetype: {selectedFileOne.type}</p>
                        <p>Size in bytes: {selectedFileOne.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFileOne.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <></>
                )}
                <input type="file" name="file" onChange={e => changeHandler(e,2)} />
                {isSelectedTwo ? (
                    <div>
                        <p>Filename: {selectedFileTwo.name}</p>
                        <p>Filetype: {selectedFileTwo.type}</p>
                        <p>Size in bytes: {selectedFileTwo.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFileTwo.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <></>
                )}
                <input type="file" name="file" onChange={e => changeHandler(e,3)} />
                {isSelectedThree ? (
                    <div>
                        <p>Filename: {selectedFileThree.name}</p>
                        <p>Filetype: {selectedFileThree.type}</p>
                        <p>Size in bytes: {selectedFileThree.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFileThree.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <></>
                )}
                <input type="file" name="file" onChange={e => changeHandler(e,4)} />
                {isSelectedFour ? (
                    <div>
                        <p>Filename: {selectedFileFour.name}</p>
                        <p>Filetype: {selectedFileFour.type}</p>
                        <p>Size in bytes: {selectedFileFour.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFileFour.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <></>
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