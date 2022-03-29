const SERVER_URL = "https://localhost:5001/api"

export const loadPlainText = () => {
    return (
        fetch (`${SERVER_URL}/PlainText`, {headers: {'Accept': 'application/json'}}).then(res => res.json())
    )
}

export const uploadXMLFile = (xmlData) => {
    return (
        fetch (`${SERVER_URL}/api/XMLFiles`), {
            method: 'POST',
            body: xmlData,
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/xml',
            },
        }).then(
            res => res.json()
        ).catch((error) => {
            console.error('Error:', error);
        }
    )
}

const services = {
    loadPlainText,
    uploadXMLFile,
}

export default services;
