import react, { useEffect, useState } from "react";
import actions, {hitCancelButton} from "./actions";
import { connect } from "react-redux";

function OperationArea({
    loadText,
    uploadXML,
    getAnchors,
    updateAnchor,
    deleteAnchor,
    postAnchor,
    getAnchorByTimestamp,
    getAnchorByLocation,
    getXMLFile,
    setAddingAnchorToTrue,
    setAddingAnchorToFalse,
    setDeletingAnchorToTrue,
    setDeletingAnchorToFalse,
    isAddingAnchor,
    isDeletingAnchor,
    currentTime,
    currentLocation,
    setAnchorLocationToDefault,
    hitCancelButton,
}) {
    useEffect(() => {
        document
            .getElementById("inputGroupFile04")
            .addEventListener("change", handleFileSelect, false);
    }, []);

    const [xmlFile, setXMLFile] = useState({});
    const [xmlData, setXMLData] = useState("");
    const [originalAnchor, setOriginalAnchor] = useState({
        timestamp: "3.6s",
        location: 55,
    });
    const [destinationAnchor, setDestinationAnchor] = useState({
        timestamp: "7.2s",
        location: 72,
    });
    // const [deletedAnchor, setDeletedAnchor] = useState({
    //     timestamp: "7.2s",
    //     location: 72,
    // });
    // const [postedAnchor, setPostedAnchor] = useState({
    //     timestamp: "8.8s",
    //     location: 88,
    // });

    const [timestamp, setTimestamp] = useState("1.62s");

    const [location, setLocation] = useState(88);

    const loadTextFromServer = () => {
        loadText();
    };

    const handleFileSelect = (event) => {
        setXMLFile(event.target.files);
    };

    const getXMLFileText = () => {
        console.log("read XML");
        const reader = new FileReader();
        reader.readAsText(xmlFile[0]);
        reader.onload = () => {
            console.log("reader", reader.result);
            console.log("reader type", typeof reader.result);
            setXMLData(reader.result);
        };
    };

    const uploadXMLFile = () => {
        console.log("upload file");
        uploadXML(xmlData);
    };

    const getAnchorsFromServer = () => {
        console.log("get anchors");
        getAnchors();
    };

    const updateAnchorToServer = (originalAnchor, destinationAnchor) => {
        console.log("update anchor");
        updateAnchor(originalAnchor, destinationAnchor);
    };

    const deleteAnchorToServer = (deletedAnchor) => {
        console.log("delete anchor");
        deleteAnchor(deletedAnchor);
    };

    const postAnchorToServer = (postedAnchor) => {
        console.log("post anchor");
        postAnchor(postedAnchor);
    };

    const getAnchorByTimestampFromServer = (timestamp) => {
        console.log("Get anchor by timestamp");
        getAnchorByTimestamp(timestamp);
    };

    const getAnchorByLocationFromServer = (location) => {
        console.log("Get Anchor By Location");
        getAnchorByLocation(location);
    };

    const getXMLFileFromServer = () => {
        console.log("Get XML File");
        getXMLFile();
    };

    const setAddingAnchorToTrueStatus = () => {
        setAddingAnchorToTrue();
    };

    const setDeletingAnchorToTrueStatus= () => {
        setDeletingAnchorToTrue();
    };

    const handleSave = () => {
        if (isAddingAnchor && !isDeletingAnchor) {
            // post anchor
            postAnchor({
                timestamp: currentTime,
                location: currentLocation,
            });
            // set isAddingAnchor to false
            setAddingAnchorToFalse();
            setAnchorLocationToDefault();
        } else if (!isAddingAnchor && isDeletingAnchor) {
            console.log("delete called");
            console.log("currentTime", currentTime);
            console.log("currentLocation", currentLocation);
            // delete anchor
            // location-342 anchor-holder anchor timestamp--0.1s
            let toBeDeleteAnchor = document.getElementsByClassName(`location-${currentLocation} anchor-holder anchor timestamp-${currentTime}`)[0]
            console.log("toBeDeleteAnchor", toBeDeleteAnchor);
            toBeDeleteAnchor.classList.remove(`anchor`);
            toBeDeleteAnchor.classList.remove(`timestamp-${currentTime}`);
            toBeDeleteAnchor.removeAttribute("style");
            console.log("toBeDeleteAnchor", toBeDeleteAnchor);
            deleteAnchor({
                timestamp: currentTime,
                location: currentLocation,
            });
            // set isDeletingAnchor to false
            setDeletingAnchorToFalse();
            setAnchorLocationToDefault();
        } else if (!isAddingAnchor && !isDeletingAnchor) {
        } else {
        }
    };

    const handleCancel = () => {
        // cancel current selected span's background color
        setAddingAnchorToFalse();
        setDeletingAnchorToFalse();
        hitCancelButton(); // trigger the useEffect to cancel previous selected span background color
        setAnchorLocationToDefault();
    };

    return (
        <div className="operation-area-style">
            {/*<h1>{currentLocation}</h1>*/}
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-primary post-anchor-button"*/}
            {/*    onClick={() => postAnchorToServer(postedAnchor)}*/}
            {/*>*/}
            {/*    Post Anchors*/}
            {/*</button>*/}
            <div className="control-buttons-area">
                <button
                    type="button"
                    className="btn btn-primary get-anchors-button btn-space"
                    onClick={() => getAnchorsFromServer()}
                >
                    Get Anchors
                </button>
                <button
                    type="button"
                    className="btn btn-primary get-text-button btn-space"
                    onClick={() => loadTextFromServer()}
                >
                    Get Text
                </button>
                <button
                    type="button"
                    className="btn btn-primary upload-text-button btn-space"
                    onClick={() => uploadXMLFile()}
                >
                    Upload Text
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-space"
                    onClick={() => getXMLFileFromServer()}
                >
                    Get XML File
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-space"
                    onClick={() => setAddingAnchorToTrueStatus()}
                >
                    Add Anchor
                </button>
                <button
                    type="button"
                    className="btn btn-primary delete-anchor-button btn-space"
                    onClick={() => setDeletingAnchorToTrueStatus()}
                >
                    Delete Anchor
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-space"
                    onClick={() => handleSave()}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-space"
                    onClick={() => handleCancel()}
                >
                    Cancel
                </button>
            </div>
            <div className="input-group">
                <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                />
                <button
                    className="btn btn-outline-secondary upload-file-button"
                    type="button"
                    id="inputGroupFileAddon04"
                    onClick={() => getXMLFileText()}
                >
                    Upload File
                </button>
            </div>
        </div>
    );
}

const stpm = (state) => {
    return {
        isAddingAnchor: state.textareaReducer.isAddingAnchor,
        isDeletingAnchor: state.textareaReducer.isDeletingAnchor,
        currentTime: state.textareaReducer.currentTime,
        currentLocation: state.textareaReducer.currentLocation,
    };
};

const dtpm = (dispatch) => {
    return {
        loadText: () => actions.loadText(dispatch),
        uploadXML: (xmlData) => actions.uploadXML(dispatch, xmlData),
        getAnchors: () => actions.getAnchors(dispatch),
        updateAnchor: (originalAnchor, destinationAnchor) =>
            actions.updateAnchor(dispatch, originalAnchor, destinationAnchor),
        deleteAnchor: (deletedAnchor) =>
            actions.deleteAnchor(dispatch, deletedAnchor),
        postAnchor: (postedAnchor) =>
            actions.postAnchor(dispatch, postedAnchor),
        getAnchorByTimestamp: (timestamp) =>
            actions.getAnchorByTimestamp(dispatch, timestamp),
        getAnchorByLocation: (location) =>
            actions.getAnchorByLocation(dispatch, location),
        getXMLFile: () => actions.getXMLFile(dispatch),
        setAddingAnchorToTrue: () => actions.setAddingAnchorToTrue(dispatch),
        setAddingAnchorToFalse: () => actions.setAddingAnchorToFalse(dispatch),
        setDeletingAnchorToTrue: () =>
            actions.setDeletingAnchorToTrue(dispatch),
        setDeletingAnchorToFalse: () =>
            actions.setDeletingAnchorToFalse(dispatch),
        setAnchorLocationToDefault: () =>
            actions.setAnchorLocationToDefault(dispatch),
        hitCancelButton: () => actions.hitCancelButton(dispatch),
    };
};

export default connect(stpm, dtpm)(OperationArea);
