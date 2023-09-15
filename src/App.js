import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
function App() {
    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([])
    const [history, setHistory] = useState([])
    const imageRef = useRef()
    const textInputRef = useRef()
    const fileInputRef = useRef()
    var classes=['Angus','Hereford', 'No pure race']

    async function loadModel(){
        setIsModelLoading(true)
        try {
            const model = await tf.loadGraphModel(process.env.PUBLIC_URL+"/cowModel/model.json");
            setModel(model);
            setIsModelLoading(false);
        } catch (error) {
            console.log(error);
            setIsModelLoading(false);
        }
    }

    const uploadImage = (e) => {
        const { files } = e.target
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0])
            setImageURL(url)
        } else {
            setImageURL(null)
        }
    }

    const identify = async () => {
        textInputRef.current.value = ''
        const image= new Image();
        image.crossOrigin='anonymus'
        image.src=imageRef.current.src;
        image.onload= async() => {
            const tensorImg= tf.browser.fromPixels(image);
            const resizedTensor = tf.image.resizeBilinear(tensorImg, [224, 224]);
            const batchedTensor= resizedTensor.expandDims(0);
            const results = await model.predict(batchedTensor);
            results.data().then(function(result){
                var probsArray=Array.from(result);
                setResults(probsArray);
            })
        }

    }

    const handleOnChange = (e) => {
        setImageURL(e.target.value)
        // setResults()
    }

    const triggerUpload = () => {
        fileInputRef.current.click()
    }

    useEffect(()=>{
        tf.ready().then(()=>{loadModel()});
      },[]
    )

    useEffect(() =>{
        if (!history.includes(imageURL) && imageURL) {
            setHistory([imageURL, ...history])
        }
    }, [imageURL])

    if (isModelLoading) {
        return <h2>Model Loading...</h2>
    }

    return (
        <div className="App">
            <h1 className='header'>Image Identification</h1>
            <div className='inputHolder'>
                <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
                <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
                <span className='or'>OR</span>
                <input type="text" placeholder='Paste image URL' ref={textInputRef} onChange={handleOnChange} />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} className="imgPreview"/>}
                    </div>
                    {results.length > 0 && <div className='resultsHolder'>
                        {results.map((result, index) => {
                            return (
                                <div className='result' key={classes[index]}>
                                    <span className='name'>{classes[index]}</span>
                                    <span className='confidence'>Confidence level: {(result * 100).toFixed(2)}% { result>0.5 && <span className='bestGuess'>Best Guess</span>}</span>
                                </div>
                            )
                        })}
                    </div>}
                </div>
                {imageURL && <button className='button' onClick={identify}>Identify Image</button>}
            </div>
            {history.length > 0 && <div className="recentPredictions">
                <h2>Recent Images</h2>
                <div className="recentImages">
                    {history.map((image, index) => {
                        return (
                            <div className="recentPrediction" key={`${image}${index}`}>
                                <img src={image} alt='Recent Prediction' onClick={() => imageRef.current.src===image ? ';':setImageURL(image)} className="imgRecent" />
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );
}

export default App;
